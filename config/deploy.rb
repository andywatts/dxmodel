require 'capistrano/rails'
set :bundle_roles, :all
set :bundle_without, %w{development test}.join(' ')
set :bundle_gemfile, -> { release_path.join('Gemfile') }
set :bundle_dir, -> { shared_path.join('bundle') }

set :application, 'dxmodel'
set :repo_url, 'git@github.com:andywatts/dxmodel.git'
set :format, :pretty
set :log_level, :info 
set :pty, true
set :keep_releases, 5
# set :linked_files, %w{config/database.yml}
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}


# Roles
role :app, %w{dxmodel@dxmodel.com}
role :web, %w{dxmodel@dxmodel.com}
role :db,  %w{dxmodel@dxmodel.com}

# Servers
server 'dxmodel.com', user: 'dxmodel', roles: [:web, :app]


namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "mkdir -p #{current_path}/tmp"
      execute "touch #{release_path.join('tmp/restart.txt')}"
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :finishing, 'deploy:cleanup'
end
