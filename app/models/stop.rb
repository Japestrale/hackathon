class Stop < ActiveRecord::Base

  has_many :journey_pattern_section_start_points, class: JourneyPatternSection, foreign_key: :from_stop_id
  has_many :journey_pattern_section_end_points, class: JourneyPatternSection, foreign_key: :to_stop_id

end
