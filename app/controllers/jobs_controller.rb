class JobsController < ApplicationController

  def index
    @jobs = Job.all
  end

  def show
  end

  def new
  end

  def create
    Job.create(job_params)
  end

  private
  def job_params
    params.require(:job).permit(:title, :location, :salary, :grading, :description, :full_time, :contract, :offers_visa, :employer_id)
  end
end
