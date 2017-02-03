require 'json'

class TestsController < ApplicationController
  def big_five
    params = {question1_category: "1", question2_category: "2", question3_category: "3", question4_category: "4", question5_category: "5", question6_category: "1", question7_category: "2", question8_category: "3", question9_category: "4", question10_category: "5", question11_category: "1", question12_category: "2", question13_category: "3", question14_category: "4", question15_category: "5", question16_category: "1", question17_category: "2", question18_category: "3", question19_category: "4", question20_category: "5", question21_category: "1", question22_category: "2", question23_category: "3", question24_category: "4", question25_category: "5", question26_category: "1", question27_category: "2", question28_category: "3", question29_category: "4", question30_category: "5", question31_category: "1", question32_category: "2", question33_category: "3", question34_category: "4", question35_category: "5", question36_category: "1", question37_category: "2", question38_category: "3", question39_category: "4", question40_category: "5", question41_category: "1", question42_category: "2", question43_category: "3", question44_category: "4", question45_category: "5", question46_category: "1", question47_category: "2", question48_category: "3", question49_category: "4", question50_category: "5", user_id: "11"}
    extraversion = 0
    agreeableness = 0
    conscientiousness = 0
    stability = 0
    openness = 0
    params.each do |k, v|
      unless k.match(/_category/)
        category_key = params.keys.select{ |key| key.match(/#{k}_category/) }.first
        category = params[category_key]
        case category.to_i
        when 1
          extraversion += v.to_i
        when 2
          agreeableness += v.to_i
        when 3
          conscientiousness += v.to_i
        when 4
          stability += v.to_i
        when 5
          openness += v.to_i
        end
      end
    end
    user = User.find_by(id: params[:user_id])
    account = user.get_account

    big_five = BigFive.find_by(hunter_id: account.id)
    if big_five
      big_five.update(extraversion: extraversion, agreeableness: agreeableness, conscientiousness: conscientiousness, stability: stability, openness: openness)
    else
      BigFive.create(extraversion: extraversion, agreeableness: agreeableness, conscientiousness: conscientiousness, stability: stability, openness: openness, hunter_id: account.id)
    end
    redirect_to(user_dashboard_path(user))
  end

  def myers_briggs
    i_e = {count: 0, value: 0}
    n_s = {count: 0, value: 0}
    t_f = {count: 0, value: 0}
    j_p = {count: 0, value: 0}
    params.each do |k, v|
      unless k.match(/_category/)
        category_key = params.keys.select{ |key| key.match(/#{k}_category/) }.first
        category = params[category_key]
        case category.to_i
        when 1
          i_e[:value] += v.to_i
          i_e[:count] += 1
        when 2
          n_s[:value] += v.to_i
          n_s[:count] += 1
        when 3
          t_f[:value] += v.to_i
          t_f[:count] += 1
        when 4
          j_p[:value] += v.to_i
          j_p[:count] += 1
        end
      end
    end
    first_type = i_e[:value] > 0 ? "I" : "E"
    second_type = n_s[:value] > 0 ? "N" : "S"
    third_type = t_f[:value] > 0 ? "T" : "F"
    fourth_type = j_p[:value] > 0 ? "J" : "P"

    first_value = (i_e[:value].to_f / (i_e[:count] * 5).to_f) * 100
    second_value = (n_s[:value].to_f / (n_s[:count] * 5).to_f) * 100
    third_value = (t_f[:value].to_f / (t_f[:count] * 5).to_f) * 100
    fourth_value = (j_p[:value].to_f / (j_p[:count] * 5).to_f) * 100

    user = User.find_by(id: params[:user_id])
    account = user.get_account
    myers_briggs = MyersBriggs.find_by(hunter_id: account.id)
    if myers_briggs
      myers_briggs.update(first: {name: first_type, value: first_value}.to_json, second: {name: second_type, value: second_value}.to_json, third: {name: third_type, value: third_value}.to_json, fourth: {name: fourth_type, value: fourth_value}.to_json)
    else
      MyersBriggs.create(first: {name: first_type, value: first_value}.to_json, second: {name: second_type, value: second_value}.to_json, third: {name: third_type, value: third_value}.to_json, fourth: {name: fourth_type, value: fourth_value}.to_json, hunter_id: account.id)
    end
    redirect_to(user_dashboard_path(user))
  end
end
