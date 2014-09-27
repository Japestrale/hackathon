class RoutesController < ApplicationController

  include HTTParty
  base_uri 'https://bus.data.je'

  def live
    auth = {:username => "hackathondemo", :password => "hackathondemo"}
    route = params[:id]
    response = self.class.get("/line/#{route}", basic_auth: auth)
    respond_to do |format|
      format.json { render json: response }
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