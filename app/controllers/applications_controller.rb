class ApplicationsController < ApplicationController
  before_action :authenticate_user!
  before_action :verify_hunter, only: [:new, :create]

  def show
    @application = Application.find_by(id: params[:id])
  end

  def new
    @job = Job.find_by(id: params[:job_id])
  end

  def create
    hunter = current_user.get_account
    application = Application.new(application_params)
    application.update(hunter_id: hunter.id)
    application.save
    redirect_to(user_dashboard_path(current_user))
  end

  def accounts
    respond_to do |format|
      format.html {}
      format.json {
        application = Application.find_by(id: params[:application_id])
        render json: {hunter: application.hunter, job: application.job}
      }
    end
  end

  private
  def application_params
    params.permit(:body, :job_id)
  end

  def verify_hunter
    if current_user.account_type != "hunter"
      redirect_to :back
    end
  end
end
