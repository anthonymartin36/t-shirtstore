class Api::V1::NewsletterSubscriptionsController < ApplicationController
  def create
    subscription = NewsletterSubscription.new(email: params[:email])
    if subscription.save
      render json: { message: 'You have been subscribed.' }, status: :created
    else
      render json: { errors: subscription.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
