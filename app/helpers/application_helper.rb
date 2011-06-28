module ApplicationHelper
  def app_config_js
  end

  def app_config_js
    app_config = { facebook: {
      appId: APP_CONFIG["facebook"]["app_id"] }}

    app_config = "window.AppConfig = #{app_config.to_json};"

    javascript_tag app_config
  end
end
