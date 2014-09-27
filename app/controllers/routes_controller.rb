class RoutesController < ApplicationController

  include HTTParty
  base_uri 'https://bus.data.je'

  def live
    auth = {:username => "hackathondemo", :password => "hackathondemo"}
    route = params[:id]
    response = self.class.get("/line/#{route}", basic_auth: auth)

    data = JSON.parse(response.body)
    data.delete_if do |item|

      recorded_time = Time.parse(item[0]["RecordedAtTime"])
      line = item[0]["MonitoredVehicleJourney"]["LineRef"]
      # puts recorded_time

      if recorded_time < Time.zone.now - 2.minutes || line != route
        # puts "deleted"
        true
      else
        false
      end
    end

    # puts data.inspect

    respond_to do |format|
      format.json { render json: data }
    end

  end

  def geo
    auth = {:username => "hackathondemo", :password => "hackathondemo"}
    lat = params[:lat]
    lng = params[:lng]
    response = self.class.get("/geo/#{lat}/#{lng}", basic_auth: auth)
    respond_to do |format|
      format.json { render json: response }
    end

  end

end