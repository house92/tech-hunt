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
                  query: params[:title],
                  operator: "and"
                }
              },
              match: {
                location: {
                  query: params[:location]
                }
              }
            ],
            should: [
              { match: { title: params[:title] }}
              # { match: { salary: params[:salary] }},
              # { match: { full_time: params[:full_time] }},
              # { match: { contract: params[:contract] }},
              # { match: { grading: params[:grading] }},
              # { match: { offers_visa: params[:offers_visa] }}
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
    params.permit(:title, :location, :lat, :lng, :salary, :grading, :description, :full_time, :contract, :offers_visa)
  end

  def skills_params
    params.require(:skills).permit(:name)
  end

  def benefits_params
    params.require(:benefits).permit(:name)
  end
end
