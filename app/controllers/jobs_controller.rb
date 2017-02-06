require 'will_paginate'

class JobsController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @jobs = Job.search({
      query: {
          bool: {
            must: [
              match: {
                description: {
                  query: job_params[:title],
                  operator: "and"
                }
              },
              match: {
                location: {
                  query: job_params[:location]
                }
              }
            ],
            should: [
              { match: { title: job_params[:title] }},
              { range: {
                  salary: {
                    gte: job_params[:min_salary] != "" ? job_params[:min_salary] : 0,
                    lte: job_params[:max_salary] != "" ? job_params[:max_salary] : 1000000
                  }
                }},
              { terms: { full_time: [job_params[:full_time], job_params[:part_time]] }},
              { terms: { contract: [job_params[:contract], job_params[:permanent]] }},
              { match: { grading: job_params[:grading] }},
              { match: { offers_visa: job_params[:offers_visa] }}
            ]
          }
        }
      }).records
      # @jobs = Job.find_by_sql({"
      #     SELECT j.*, e.*
      #       FROM jobs AS J
      #         INNER JOIN employers AS e ON j.employer_id = e.id
      #       WHERE ? IN (j.description OR j.title)
      #   "}, params[:title])
    end

  def show
    @job = Job.find_by(id: params[:id])
  end

  def new
  end

  def create
    account = current_user.get_account
    job = Job.new(job_params)
    job.update(employer_id: account.id)
    job.save
    job.__elasticsearch__.index_document
  end

  private
  def job_params
    params.permit(:title, :location, :lat, :lng, :min_salary, :max_salary, :grading, :description, :full_time, :part_time, :permanent, :contract, :offers_visa)
  end

  def skills_params
    params.require(:skills).permit(:name)
  end

  def benefits_params
    params.require(:benefits).permit(:name)
  end
end
