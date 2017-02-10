class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.application_notification.subject
  #
  def application_notification(user, employer, application)
    @application = application
    @applicant = user
    @recipient = employer.user
    @url = "localhost:3000/jobs/#{application.job.id}/applications/#{application.id}"
    mail(to: @recipient.email, subject: "You have a new application from #{@applicant.hunter.first_name} #{@applicant.hunter.last_name}")
  end
end
