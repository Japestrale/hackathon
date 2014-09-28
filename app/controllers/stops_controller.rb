class StopsController < ApplicationController

  def index
    @stops = Stop.all
    respond_to do |format|
      format.json { render json: @stops }
    end
  end

  def next_buses

    @stop = Stop.find(params[:id])
    # @stop = Stop.first

    @dataset = 1

    @next_buses = []


    # @all_stopping_routes = @stop.journey_pattern_section_start_points
    @all_stopping_routes = JourneyPatternSection.where(dataset_id: @dataset, from_stop_id: @stop.id)

    # sql = "select * from journey_patterns jp inner join services s on s.id = jp.service_id and s.dataset_id = jp.dataset_id inner join journey_pattern_sections jps on jps.id = jp.journey_pattern_section_id and jps.dataset_id = jp.dataset_id where s.dataset_id = #{@dataset} and jps.from_stop_id = #{@stop.id}"

    # @all_stopping_routes = ActiveRecord::Base.connection.execute(sql)

    # All sections that stop at this stop
    @all_stopping_routes.each do |jps|

      puts jps.inspect

      # All journeys that stop at this stop for this dataset
      @journey_patterns = JourneyPattern.where(dataset_id: @dataset, journey_pattern_section_id: jps.id)
      # puts @journey_patterns

      @journey_patterns.each do |jp|

        # Quick breakdown of each journey pattern that hits this stop
        # puts "#{jp.description} - #{jp.direction}"

        @sections = JourneyPatternSection.where(dataset_id: @dataset, id: jp.journey_pattern_section_id)

        runtime = 0;
        @sections.each do |section|
          # puts "#{section.from_stop.name} . runtime: #{section.runtime}"
          runtime += section.runtime if section.route_section_id <= jps.route_section_id
        end

        # puts "#{jp.description} - #{jp.direction}: Time To Stop - #{runtime}"

        # Journeys that correspond to these patterns
        @journeys = Journey.where(dataset_id: @dataset, journey_pattern_id: jp.id)

        @journeys.each do |journey|

          # Ok so this journey is gonna hit this stop at some point. We dont know when. We have to work out when
          departure_time = Time.zone.now.change({ hour: journey.departure_time.hour, min: journey.departure_time.min, sec: journey.departure_time.sec })
          bus_hits_stop = departure_time + runtime.minutes - 1.hour

          # puts "#{jp.description} - #{jp.direction}: Leaves at: #{departure_time}. Hits stop at #{bus_hits_stop}. Runttime: #{runtime}"

          # We only care about buses that we can catch
          if bus_hits_stop > Time.zone.now

            # puts "Hits stop at #{bus_hits_stop}. Time #{Time.zone.now}"

            time_until_bus_stops = (bus_hits_stop - Time.zone.now).to_i.abs / 60
            # puts "The bus will hit the stop in #{time_until_bus_stops}"

            route_name = Service.find_by(dataset_id: @dataset, id: jp.service_id).route_name
            @next_buses << { route: route_name, destination: jp.destination_display, description: jp.description, stops_at: bus_hits_stop, eta: time_until_bus_stops }

          else
            # puts "Too late - This route has passed"
          end

        end

      end

    end

    @next_buses.sort_by! { |bus| bus[:eta] }

    respond_to do |format|
      format.json { render json: @next_buses[0,4] }
    end


  end

end
