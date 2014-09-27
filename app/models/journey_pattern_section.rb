class JourneyPatternSection < ActiveRecord::Base

  belongs_to :journey_pattern, class: JourneyPattern, foreign_key: :id

  belongs_to :from_stop, class: "Stop", foreign_key: :from_stop
  belongs_to :to_stop, class: "Stop", foreign_key: :to_stop

end