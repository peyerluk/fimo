guard 'coffeescript', :input => 'coffee', :output => 'app', :bare => true
guard 'coffeescript', :input => 'public/coffee', :output => 'public/js/app'

guard 'less', :all_on_start => false, :all_after_change => false, :output => "public/css" do
  watch(%r{^public/.*\.less$}) { "public/less/fimo.less" }
end
