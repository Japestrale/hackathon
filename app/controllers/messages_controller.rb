class MessagesController < ApplicationController

 include ActionController::Live

  def index
    @messages = Message.all
  end

  def new
    @message = Message.new
  end

  def create
    response.headers["Content-Type"] = "text/javascript"
    attributes = params.require(:message).permit(:content, :name)
    @message = Message.create!(attributes)
    $redis.publish('messages.create', @message.to_json)
    # render nothing: true
  end

  def events
    response.headers["Content-Type"] = "text/event-stream"

    @positions = [ [49.12,-2.12],[49.13,-2.13] ]
    # @hash = Gmaps4rails.build_markers(@positions) do |position|
    #   marker.lat position[0]
    #   marker.lng position[1]
    # end

    1.times do

      response.stream.write("event: message.create\n")
      response.stream.write("data: #{@positions.to_json}\n\n")
      sleep 2
    end

    # redis = Redis.new
    # redis.psubscribe('messages.*') do |on|
    #   on.pmessage do |pattern, event, data|
    #     response.stream.write("event: #{event}\n")
    #     response.stream.write("data: #{data}\n\n")
    #   end
    # end
  rescue IOError
    logger.info "Stream closed"
  ensure
    # redis.quit
    response.stream.close
  end

end