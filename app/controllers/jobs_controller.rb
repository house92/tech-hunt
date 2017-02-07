require 'will_paginate'

class JobsController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @search = job_params
    length_of_latitude = 69.172
    length_of_longitude = Math.cos(job_params[:lat].to_f) * 69.172
    @jobs = Job.search({
      query: {
          bool: {
            must: [
              {match: {
                description: {
                  query: job_params[:title],
                  operator: "and"
                }
              }},
              {range: {
                lat: {
                  gte: job_params[:lat].to_f - (15 / 69.172),
                  lte: job_params[:lat].to_f + (15 / 69.172)
                }
              }},
              {range: {
                lng: {
                  gte: job_params[:lng].to_f - (15 / length_of_longitude),
                  lte: job_params[:lng].to_f + (15 / length_of_longitude)
                }
              }}
            ],
            should: [
              { match: { title: job_params[:title] }},
              { range: {
                  salary: {
                    gte: job_params[:min_salary] != "" ? job_params[:min_salary] : 0,
                    lte: job_params[:max_salary] != "" ? job_params[:max_salary] : 1000000
                  }
                }},
              { match: {
                  location: {
                    query: job_params[:location]
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

  # def skills_params
  #   params.require(:skills).permit(:name)
  # end
  #
  # def benefits_params
  #   params.require(:benefits).permit(:name)
  # end
end
