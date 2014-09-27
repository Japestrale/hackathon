class Dataset < ActiveRecord::Base

  has_many :journey_pattern_sections
  has_many :journey_patterns
  has_many :journeys
  has_many :route_sections
  has_many :routes
  has_many :services

end