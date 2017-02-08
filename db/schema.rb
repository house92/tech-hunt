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

ActiveRecord::Schema.define(version: 20170208120213) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.text     "body"
    t.boolean  "read",       default: false
    t.boolean  "accepted",   default: false
    t.integer  "hunter_id"
    t.integer  "job_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["hunter_id"], name: "index_applications_on_hunter_id", using: :btree
    t.index ["job_id"], name: "index_applications_on_job_id", using: :btree
  end

  create_table "benefits", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "big_fives", force: :cascade do |t|
    t.integer  "extraversion"
    t.integer  "conscientiousness"
    t.integer  "agreeableness"
    t.integer  "stability"
    t.integer  "openness"
    t.integer  "hunter_id"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "name",              default: "Big Five"
    t.index ["hunter_id"], name: "index_big_fives_on_hunter_id", using: :btree
  end

  create_table "employers", force: :cascade do |t|
    t.string   "company_name"
    t.string   "location"
    t.text     "bio"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_employers_on_user_id", using: :btree
  end

  create_table "hunter_skills", force: :cascade do |t|
    t.string   "competence"
    t.integer  "hunter_id"
    t.integer  "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hunter_id"], name: "index_hunter_skills_on_hunter_id", using: :btree
    t.index ["skill_id"], name: "index_hunter_skills_on_skill_id", using: :btree
  end

  create_table "hunters", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "location"
    t.text     "bio"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_hunters_on_user_id", using: :btree
  end

  create_table "industry_skills", force: :cascade do |t|
    t.integer  "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_industry_skills_on_skill_id", using: :btree
  end

  create_table "job_benefits", force: :cascade do |t|
    t.integer  "value"
    t.integer  "job_id"
    t.integer  "benefit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["benefit_id"], name: "index_job_benefits_on_benefit_id", using: :btree
    t.index ["job_id"], name: "index_job_benefits_on_job_id", using: :btree
  end

  create_table "job_skills", force: :cascade do |t|
    t.integer  "job_id"
    t.integer  "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "competence"
    t.index ["job_id"], name: "index_job_skills_on_job_id", using: :btree
    t.index ["skill_id"], name: "index_job_skills_on_skill_id", using: :btree
  end

  create_table "jobs", force: :cascade do |t|
    t.string   "title"
    t.string   "location"
    t.integer  "salary"
    t.string   "grading"
    t.string   "description"
    t.boolean  "full_time"
    t.boolean  "contract"
    t.boolean  "offers_visa"
    t.integer  "employer_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.float    "lat"
    t.float    "lng"
    t.index ["employer_id"], name: "index_jobs_on_employer_id", using: :btree
  end

  create_table "myers_briggs", force: :cascade do |t|
    t.string   "first"
    t.string   "second"
    t.string   "third"
    t.string   "fourth"
    t.integer  "hunter_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name",       default: "Myers-Briggs"
    t.index ["hunter_id"], name: "index_myers_briggs_on_hunter_id", using: :btree
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "social_media", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "sm_id"
    t.string   "email"
    t.string   "sm_acc_token"
    t.integer  "public_repos"
    t.integer  "public_gists"
    t.integer  "followers"
    t.integer  "following"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_social_media_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: ""
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "account_type"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "applications", "hunters"
  add_foreign_key "applications", "jobs"
  add_foreign_key "big_fives", "hunters"
  add_foreign_key "employers", "users"
  add_foreign_key "hunter_skills", "hunters"
  add_foreign_key "hunter_skills", "skills"
  add_foreign_key "hunters", "users"
  add_foreign_key "industry_skills", "skills"
  add_foreign_key "job_benefits", "benefits"
  add_foreign_key "job_benefits", "jobs"
  add_foreign_key "job_skills", "jobs"
  add_foreign_key "job_skills", "skills"
  add_foreign_key "jobs", "employers"
  add_foreign_key "myers_briggs", "hunters"
  add_foreign_key "social_media", "users"
end
