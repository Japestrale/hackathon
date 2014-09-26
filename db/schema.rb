# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140926194615) do

  create_table "datasets", id: false, force: true do |t|
    t.string "Filename", limit: 42
    t.string "GUID",     limit: 36
    t.string "Created",  limit: 19
  end

  create_table "journey_pattern_sections", id: false, force: true do |t|
    t.string  "section",                                                 limit: 22
    t.string  "DataSetId",                                               limit: 36
    t.string  "JourneyPatternSections_From_id",                          limit: 8
    t.string  "JourneyPatternSections_From_StopPointRef_id",             limit: 8
    t.integer "JourneyPatternSections_From_StopPointRef_SequenceNumber"
    t.string  "JourneyPatternSections_From_StopPointRef",                limit: 10
    t.string  "JourneyPatternSections_From_TimingStatus_id",             limit: 8
    t.integer "JourneyPatternSections_From_TimingStatus_SequenceNumber"
    t.string  "JourneyPatternSections_From_TimingStatus",                limit: 3
    t.string  "JourneyPatternSections_To_id",                            limit: 8
    t.string  "JourneyPatternSections_To_StopPointRef_id",               limit: 8
    t.integer "JourneyPatternSections_To_StopPointRef_SequenceNumber"
    t.string  "JourneyPatternSections_To_StopPointRef",                  limit: 10
    t.string  "JourneyPatternSections_To_TimingStatus_id",               limit: 8
    t.integer "JourneyPatternSections_To_TimingStatus_SequenceNumber"
    t.string  "JourneyPatternSections_To_TimingStatus",                  limit: 3
    t.string  "JourneyPatternSections_RouteLinkRef_id",                  limit: 8
    t.string  "JourneyPatternSections_RouteLinkRef",                     limit: 6
    t.string  "JourneyPatternSections_RunTime_id",                       limit: 8
    t.string  "JourneyPatternSections_RunTime",                          limit: 5
  end

  create_table "journey_patterns", id: false, force: true do |t|
    t.string "ServiceGuid",               limit: 36
    t.string "JourneyPartternID",         limit: 5
    t.string "DataSetId",                 limit: 36
    t.string "DestinationDisplay",        limit: 19
    t.string "Direction",                 limit: 8
    t.string "Description",               limit: 37
    t.string "RouteRef",                  limit: 5
    t.string "JourneyPatternSectionRefs", limit: 6
  end

  create_table "messages", force: true do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "operators", id: false, force: true do |t|
    t.string "DataSetId",                           limit: 36
    t.string "Operators_OperatorCode_id",           limit: 2
    t.string "Operators_OperatorCode",              limit: 3
    t.string "Operators_OperatorShortName_id",      limit: 2
    t.string "Operators_OperatorShortName",         limit: 13
    t.string "Operators_Garages_id",                limit: 2
    t.string "Operators_Garages_Garage_GarageCode", limit: 3
  end

  create_table "routes", id: false, force: true do |t|
    t.string "DataSetId",                 limit: 36
    t.string "Routes_Description_id",     limit: 5
    t.string "Routes_Description",        limit: 37
    t.string "Routes_RouteSectionRef_id", limit: 5
    t.string "Routes_RouteSectionRef",    limit: 5
  end

  create_table "routesections", id: false, force: true do |t|
    t.string "section",                         limit: 13
    t.string "DataSetId",                       limit: 36
    t.string "RouteSections_From_id",           limit: 6
    t.string "RouteSections_From_StopPointRef", limit: 10
    t.string "RouteSections_To_id",             limit: 6
    t.string "RouteSections_To_StopPointRef",   limit: 10
    t.string "RouteSections_Direction_id",      limit: 6
    t.string "RouteSections_Direction",         limit: 8
  end

  create_table "serviced_organisations", id: false, force: true do |t|
    t.string "DataSetId",                              limit: 36
    t.string "ServicedOrganisations_OrganisationCode", limit: 3
    t.string "ServicedOrganisations_Name",             limit: 7
  end

  create_table "services", id: false, force: true do |t|
    t.string "DataSetId",                                           limit: 36
    t.string "Services_ServiceCode",                                limit: 7
    t.string "Services_PrivateCode",                                limit: 8
    t.string "Services_Lines_Line_LineName_id",                     limit: 4
    t.string "Services_Lines_Line_LineName",                        limit: 3
    t.string "Services_OperatingPeriod_StartDate",                  limit: 10
    t.string "Services_OperatingPeriod_EndDate",                    limit: 10
    t.string "Services_OperatingProfile_RegularDayType_DOW_Sun",    limit: 10
    t.string "Services_RegisteredOperatorRef",                      limit: 2
    t.string "Services_StopRequirements_NoNewStopsRequired",        limit: 10
    t.string "Services_StandardService_Origin",                     limit: 18
    t.string "Services_StandardService_Destination",                limit: 21
    t.string "ServiceGUID",                                         limit: 36
    t.string "Services_Direction",                                  limit: 18
    t.string "Services_StandardService_Vias_Via",                   limit: 32
    t.string "Services_OperatingProfile_RegularDayType_DOW_Sat",    limit: 10
    t.string "Services_OperatingProfile_RegularDayType_DOW_MonFri", limit: 10
  end

  create_table "stoppoints", id: false, force: true do |t|
    t.string "DataSetId",                       limit: 36
    t.string "StopPoints_StopPointRef",         limit: 10
    t.string "StopPoints_CommonName",           limit: 27
    t.string "StopPoints_Location_GridType_id", limit: 4
    t.string "StopPoints_Location_GridType",    limit: 4
    t.string "StopPoints_Location_Easting_id",  limit: 4
    t.string "StopPoints_Location_Easting",     limit: 5
    t.string "StopPoints_Location_Northing_id", limit: 4
    t.string "StopPoints_Location_Northing",    limit: 5
  end

  create_table "stops", force: true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "vix_name"
    t.integer  "easting"
    t.integer  "northing"
    t.decimal  "latitude",   precision: 11, scale: 8
    t.decimal  "longitude",  precision: 11, scale: 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "vehicle_journeys", id: false, force: true do |t|
    t.string  "DataSetId",                                                   limit: 36
    t.integer "VehicleJourneys_PrivateCode_SequenceNumber"
    t.string  "VehicleJourneys_PrivateCode",                                 limit: 13
    t.integer "VehicleJourneys_Operational_SequenceNumber"
    t.string  "VehicleJourneys_Operational_Block_Description",               limit: 5
    t.string  "VehicleJourneys_Operational_Block_BlockNumber",               limit: 5
    t.string  "VehicleJourneys_Operational_VehicleType_VehicleTypeCode",     limit: 2
    t.string  "VehicleJourneys_Operational_VehicleType_Description",         limit: 13
    t.integer "VehicleJourneys_Operational_TicketMachine_JourneyCode"
    t.integer "VehicleJourneys_OperatingProfile_SequenceNumber"
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Sun",     limit: 10
    t.string  "BHOperation_DaysOfNonOperation_HolMon",                       limit: 10
    t.integer "VehicleJourneys_GarageRef_SequenceNumber"
    t.string  "VehicleJourneys_GarageRef",                                   limit: 3
    t.integer "VehicleJourneys_VehicleJourneyCode_SequenceNumber"
    t.string  "VehicleJourneys_VehicleJourneyCode",                          limit: 5
    t.integer "VehicleJourneys_ServiceRef_SequenceNumber"
    t.string  "VehicleJourneys_ServiceRef",                                  limit: 7
    t.integer "VehicleJourneys_LineRef_SequenceNumber"
    t.string  "VehicleJourneys_LineRef",                                     limit: 4
    t.integer "VehicleJourneys_JourneyPatternRef_SequenceNumber"
    t.string  "VehicleJourneys_JourneyPatternRef",                           limit: 5
    t.integer "VehicleJourneys_DepartureTime_SequenceNumber"
    t.string  "VehicleJourneys_DepartureTime",                               limit: 8
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Mon",     limit: 10
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Sat",     limit: 10
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Fri",     limit: 10
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_MonFri",  limit: 10
    t.string  "DayType_DaysOfOperation_WorkingDays_ServicedOrganisationRef", limit: 3
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Tue",     limit: 10
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Wed",     limit: 10
    t.string  "VehicleJourneys_OperatingProfile_RegularDayType_DOW_Thu",     limit: 10
    t.string  "DayType_DaysOfOperation_Holidays_ServicedOrganisationRef",    limit: 3
  end

end
