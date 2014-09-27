class JourneyPattern < ActiveRecord::Base

  belongs_to :route

  has_many :journeys
  has_many :journey_patterns_sections, class: JourneyPatternSection, foreign_key: :journey_pattern_section_id

end