class UsersController < ApplicationController
  def index
  end

  def show
    respond_to do |format|
      format.html {}
      format.json {
        @account = User.find_by(id: params[:user][:id]).get_account
        render json: @account
      }
    end
  end

  def dashboard
    account = current_user.get_account
    @applications = account.applications
    @big_five = account.big_five ? account.big_five : nil
    @myers_briggs = account.myers_briggs ? account.myers_briggs : nil
  end
end
