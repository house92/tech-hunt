require 'will_paginate'

class JobsController < ApplicationController

  def index
    @jobs = Job.search({
      query: {
          bool: {
            must: {
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
            },
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
    Job.create(job_params)
    Job.__elasticsearch__.index_document
  end

  private
  def job_params
    params.require(:job).permit(:title, :location, :salary, :grading, :description, :full_time, :contract, :offers_visa, :employer_id)
  end
end
