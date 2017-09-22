class ClipsController < ApplicationController
  before_action :set_clip, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @clips = Clip.all.order(created_at: :desc)
    render json: @clips
  end

  def show
    render json: @clip
  end

  def create
    @clip = Clip.new(clip_params)

    if @clip.save
      render json: @clip, status: :created
    else
      render json: @clip.errors, status: :unprocessable_entity
    end

  end

  def update

    if @clip.update(clip_params)
      render :show, status: :ok, location: @clip
    else
      render json: @clip.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @clip.destroy
    head :no_content
  end

  private

    def set_clip
      @clip = Clip.find(params[:id])
    end


    def clip_params
      params.permit(:title, :audio_file)
    end
end
