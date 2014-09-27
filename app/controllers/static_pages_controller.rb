class StaticPagesController < ApplicationController

  def home
  end

  def test

    @stop = Stop.first
    @dataset = 3

    @all_stopping_routes = @stop.journey_pattern_section_end_points

    # All sections that stop at this stop
    @all_stopping_routes.each do |jps|

      # All journeys that stop at this stop for this dataset
      @journey_patterns = JourneyPattern.where(dataset_id: @dataset, journey_pattern_section_id: jps.id)
      # puts @journey_patterns

      @journey_patterns.each do |jp|

        # Quick breakdown of each journey pattern that hits this stop
        # puts "#{jp.description} - #{jp.direction}"

        @sections = JourneyPatternSection.where(dataset_id: @dataset, id: jp.journey_pattern_section_id)

        runtime = 0;
        @sections.each do |section|
          runtime += section.runtime if section.route_section_id <= jps.route_section_id
        end

        puts "#{jp.description} - #{jp.direction}: Time To Stop - #{runtime}"




        # Journeys that correspond to these patterns
        @journeys = Journey.where(dataset_id: @dataset, journey_pattern_id: jp.id)

        @journeys.each do |journey|

          # Ok so this journey is gonna hit this stop at some point. We dont know when. We have to work out when

          # Route time up to stop
          # JourneyPattern.where(dataset_id: @dataset, id: journey.journey_pattern_id)

        end

      end

    end

  end

end
