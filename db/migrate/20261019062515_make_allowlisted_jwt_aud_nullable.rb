class MakeAllowlistedJwtAudNullable < ActiveRecord::Migration[8.0]
  def change
    change_column_null :allowlisted_jwts, :aud, true
  end
end
