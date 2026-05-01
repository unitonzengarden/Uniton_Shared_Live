# D1 — Schema Deep Dump

**Date:** 2026-05-02  
**Method:** Supabase REST OpenAPI spec (1.13 MB at /rest/v1/)  
**Total tables/views:** 192  
**Production project:** kkhhpecofolmrodyeslp  

---

### activation_analytics (12 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  integer,  jsonb,  string,  string

### activation_growth_snapshots (18 cols)
 string,  integer,  integer,  integer,  number,  number,  integer,  integer,  integer,  integer,  integer,  number,  integer,  integer,  integer,  jsonb,  string,  string

### activity_events (7 cols)
 string,  string,  string,  string,  string,  jsonb,  string

### ai_knowledge_blocks (10 cols)
 string,  string,  string,  string,  string,  jsonb,  jsonb,  number,  string,  string

### ai_memory_records (12 cols)
 string,  string,  string,  string,  string,  jsonb,  number,  string,  string,  boolean,  string,  string

### ai_messages (9 cols)
 string,  string,  string,  string,  jsonb,  string,  string,  jsonb,  string

### ai_threads (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### ai_training_jobs (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### aier_command_queue (7 cols)
 string,  string,  string,  string,  string,  string,  string

### aier_license_collections (11 cols)
 string,  string,  string,  string,  integer,  integer,  integer,  boolean,  jsonb,  string,  string

### aier_license_owners (10 cols)
 string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string

### aier_license_renewals (11 cols)
 string,  string,  string,  integer,  string,  number,  string,  string,  jsonb,  string,  string

### aier_license_royalties (8 cols)
 string,  string,  string,  number,  integer,  string,  jsonb,  string

### aier_license_sales (13 cols)
 string,  string,  string,  string,  string,  number,  number,  string,  string,  string,  jsonb,  string,  string

### aier_license_tokens (13 cols | rows≈0)
 string,  string,  string,  string,  string,  integer,  string,  string,  number,  string,  jsonb,  string,  string

### aier_logs (6 cols)
 string,  string,  string,  string,  jsonb,  string

### aier_tasks (9 cols)
 string,  string,  string,  string,  string,  jsonb,  string,  string,  string

### aier_wisdom_vault (21 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  boolean,  number,  string,  array,  integer,  integer,  jsonb,  string,  string,  string,  string,  string

### anomaly_flags (10 cols)
 string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string

### app_bookings (11 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### app_community_posts (7 cols)
 string,  string,  string,  string,  string,  string,  string

### app_events (6 cols)
 string,  string,  string,  string,  string,  string

### app_memberships (9 cols)
 string,  string,  string,  string,  jsonb,  string,  string,  string,  string

### app_posts (5 cols)
 string,  string,  string,  string,  string

### app_profile_identity (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### app_profiles (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### app_tickets (9 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string

### app_user_roles (8 cols)
 string,  string,  string,  boolean,  string,  string,  string,  string

### app_wallet_accounts (6 cols)
 string,  number,  number,  string,  string,  string

### app_wallet_ledger (5 cols)
 string,  string,  number,  string,  string

### app_wallet_transactions (7 cols)
 string,  string,  string,  string,  number,  string,  string

### app_wallets (4 cols)
 string,  string,  number,  string

### assets (25 cols)
 string,  string,  string,  string,  string,  integer,  boolean,  boolean,  boolean,  boolean,  boolean,  boolean,  boolean,  string,  string,  number,  integer,  jsonb,  string,  string,  integer,  boolean,  boolean,  boolean,  jsonb

### audit_logs (10 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  jsonb,  string

### autopilot_alerts (7 cols)
 string,  string,  string,  string,  string,  string,  string

### autopilot_approvals (6 cols)
 string,  string,  string,  string,  string,  jsonb

### autopilot_execution_history (7 cols)
 string,  string,  string,  string,  string,  jsonb,  string

### autopilot_observations (7 cols)
 string,  string,  string,  string,  number,  string,  string

### autopilot_tasks (10 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### availability_slots (8 cols)
 string,  string,  string,  string,  integer,  integer,  string,  jsonb

### badges (8 cols)
 string,  string,  string,  string,  string,  jsonb,  boolean,  string

### bazi_audit_log (8 cols)
 string,  string,  string,  string,  string,  jsonb,  jsonb,  string

### bazi_charts (15 cols)
 string,  string,  string,  boolean,  string,  string,  string,  string,  jsonb,  jsonb,  string,  jsonb,  string,  string,  string

### booking_availability (12 cols)
 string,  string,  string,  string,  integer,  integer,  integer,  integer,  integer,  string,  string,  string

### booking_current_view (36 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  integer,  integer,  string,  string,  string,  string,  string,  string,  string,  string,  boolean,  string,  string,  number,  number,  number,  number,  string,  string,  string,  string,  string,  string

### booking_detail_view (69 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  integer,  integer,  string,  string,  string,  string,  string,  string,  string,  string,  boolean,  string,  string,  number,  number,  number,  number,  string,  string,  string,  string,  string,  array,  string,  string,  string,  string,  number,  number,  number,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  number,  string,  string,  string,  string,  string,  string,  number,  string,  string,  boolean,  string,  string,  string,  string,  string

### booking_guests (7 cols)
 string,  string,  string,  string,  string,  boolean,  jsonb

### booking_holiday_calendar (7 cols)
 string,  string,  string,  string,  boolean,  string,  string

### booking_listing_prices (11 cols)
 string,  string,  number,  number,  number,  string,  string,  boolean,  string,  string,  string

### booking_payment_records (11 cols)
 string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  string

### booking_payment_summary_view (10 cols)
 string,  number,  number,  number,  string,  string,  string,  string,  string,  string

### booking_refund_requests (10 cols)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  string

### booking_summary_view (4 cols)
 integer,  integer,  integer,  integer

### bookings (14 cols)
 string,  string,  string,  string,  string,  integer,  number,  string,  string,  string,  string,  string,  string,  string

### burn_events (12 cols)
 string,  string,  string,  string,  number,  string,  jsonb,  string,  string,  string,  number,  string

### cancellations (7 cols)
 string,  string,  string,  string,  string,  jsonb,  string

### circle_business_commission_allocations (24 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  number,  integer,  string,  string,  string,  string,  string,  jsonb,  string

### circle_business_commission_batches (20 cols)
 string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  integer,  integer,  number,  string,  string,  jsonb,  jsonb,  string,  string,  string

### circle_business_commission_configs (14 cols)
 string,  string,  string,  number,  number,  number,  number,  number,  number,  boolean,  integer,  jsonb,  string,  string

### circle_energy_metrics (7 cols)
 string,  integer,  number,  number,  number,  number,  string

### circle_members (5 cols | rows≈0)
 string,  string,  string,  string,  string

### circle_metrics (8 cols)
 string,  integer,  number,  number,  number,  jsonb,  string,  string

### circles (7 cols | rows≈3)
 string,  string,  string,  string,  string,  boolean,  string

### comment_media (10 cols)
 string,  string,  string,  string,  string,  string,  string,  integer,  jsonb,  string

### comments (5 cols | rows≈286)
 string,  string,  string,  string,  string

### community_posts (7 cols)
 string,  string,  string,  string,  string,  string,  string

### connections (7 cols)
 string,  string,  string,  string,  jsonb,  string,  string

### consents (7 cols)
 string,  string,  string,  string,  string,  string,  string

### conversations (7 cols)
 string,  string,  string,  string,  jsonb,  string,  string

### daily_missions (14 cols)
 string,  string,  string,  string,  string,  number,  number,  string,  string,  string,  string,  string,  number,  string

### devices (6 cols)
 string,  string,  string,  string,  string,  string

### energy_daily (12 cols)
 string,  string,  number,  number,  number,  number,  number,  number,  string,  string,  number,  string

### energy_events (10 cols)
 string,  string,  string,  string,  string,  string,  number,  string,  jsonb,  string

### enta_activity_log (10 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  jsonb,  string

### enta_bazi_records (22 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  jsonb,  string,  string,  string

### enta_birth_data (8 cols)
 string,  string,  integer,  integer,  integer,  string,  string,  string

### enta_birth_normalizations (10 cols)
 string,  string,  string,  jsonb,  string,  jsonb,  string,  string,  string,  string

### enta_change_logs (8 cols)
 string,  string,  string,  jsonb,  jsonb,  string,  string,  string

### enta_circle_members (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### enta_circles (10 cols)
 string,  string,  string,  string,  string,  string,  boolean,  integer,  string,  string

### enta_connection_events (18 cols)
 string,  string,  string,  string,  string,  string,  number,  number,  number,  number,  number,  string,  string,  jsonb,  string,  jsonb,  string,  string

### enta_connection_requests (7 cols)
 string,  string,  string,  string,  jsonb,  string,  string

### enta_connections (11 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### enta_conversation_members (8 cols)
 string,  string,  string,  string,  string,  string,  string,  boolean

### enta_conversations (11 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  boolean,  string,  string

### enta_conversion_test_cases (10 cols)
 string,  string,  string,  jsonb,  string,  jsonb,  jsonb,  string,  boolean,  string

### enta_current_fields (19 cols)
 string,  string,  jsonb,  string,  number,  boolean,  jsonb,  string,  number,  jsonb,  jsonb,  jsonb,  jsonb,  jsonb,  jsonb,  string,  jsonb,  string,  string

### enta_events (6 cols)
 string,  string,  string,  string,  string,  string

### enta_flow_events (13 cols)
 string,  string,  string,  string,  string,  jsonb,  string,  string,  string,  string,  jsonb,  string,  string

### enta_message_reads (5 cols)
 string,  string,  string,  string,  string

### enta_messages (10 cols)
 string,  string,  string,  string,  string,  jsonb,  string,  boolean,  string,  string

### enta_posts (10 cols)
 string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string

### enta_presence (5 cols)
 string,  string,  string,  string,  string

### enta_profiles (52 cols)
 string,  string,  integer,  integer,  integer,  string,  boolean,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  string,  jsonb,  integer,  integer,  integer,  string,  string,  boolean,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  jsonb,  jsonb,  string,  string,  string,  jsonb,  jsonb,  number,  number,  number

### enta_resonance_scores (10 cols)
 string,  string,  number,  number,  number,  number,  number,  jsonb,  string,  string

### enta_reward_calculations (16 cols)
 string,  string,  string,  string,  number,  number,  number,  number,  number,  string,  string,  string,  string,  string,  jsonb,  string

### enta_root_snapshots (22 cols)
 string,  string,  jsonb,  jsonb,  jsonb,  jsonb,  integer,  integer,  boolean,  number,  string,  string,  string,  string,  number,  string,  jsonb,  jsonb,  string,  jsonb,  string,  string

### enta_snapshots (22 cols)
 string,  string,  string,  string,  number,  number,  number,  number,  number,  number,  number,  number,  number,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string

### enta_states (31 cols)
 string,  string,  string,  number,  number,  number,  number,  number,  number,  number,  number,  number,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string,  string,  number,  number,  number,  number,  number,  number,  number,  string,  string

### enta_typing_states (7 cols)
 string,  string,  string,  boolean,  string,  string,  string

### event_attendances (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### events (16 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  jsonb,  jsonb,  string,  string

### flow_reactions (9 cols)
 string,  string,  string,  string,  string,  jsonb,  string,  string,  string

### follows (4 cols | rows≈127)
 string,  string,  string,  string

### listings (14 cols)
 string,  string,  string,  string,  string,  string,  integer,  number,  string,  boolean,  string,  string,  string,  string

### member_badges (6 cols)
 string,  string,  string,  string,  string,  string

### member_tiers (20 cols)
 string,  string,  string,  number,  integer,  integer,  number,  array,  boolean,  string,  string,  string,  integer,  number,  number,  number,  string,  integer,  boolean,  string

### membership_current_view (27 cols)
 string,  string,  string,  string,  string,  number,  number,  number,  string,  boolean,  string,  string,  string,  string,  string,  string,  string,  string,  array,  integer,  number,  number,  number,  string,  integer,  boolean,  boolean

### memberships (14 cols | rows≈135)
 string,  string,  string,  string,  string,  string,  boolean,  string,  string,  string,  number,  number,  number,  string

### messages (7 cols)
 string,  string,  string,  string,  jsonb,  string,  string

### missions (14 cols)
 string,  string,  string,  string,  number,  string,  integer,  integer,  boolean,  boolean,  number,  jsonb,  string,  string

### network_distribution_events (9 cols)
 string,  string,  string,  number,  jsonb,  integer,  string,  jsonb,  string

### network_energy_metrics (9 cols)
 string,  integer,  integer,  integer,  integer,  number,  number,  string,  string

### network_metrics (8 cols)
 string,  string,  integer,  number,  number,  jsonb,  string,  string

### node_locations (8 cols)
 string,  string,  string,  string,  string,  number,  number,  string

### node_policies (7 cols)
 string,  string,  string,  jsonb,  boolean,  string,  string

### node_staff_scopes (7 cols)
 string,  string,  string,  string,  boolean,  string,  string

### nodes (8 cols)
 string,  string,  string,  string,  string,  string,  string,  string

### notifications (8 cols)
 string,  string,  string,  string,  string,  jsonb,  string,  string

### online_reward_daily_state (8 cols)
 string,  string,  number,  number,  number,  string,  string,  string

### online_reward_reservations (11 cols)
 string,  string,  string,  number,  string,  string,  string,  string,  string,  string,  string

### orders (7 cols | rows≈6)
 string,  string,  string,  integer,  number,  string,  string

### payment_transactions (17 cols)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string,  string

### payments (11 cols)
 string,  string,  string,  string,  string,  string,  number,  string,  string,  jsonb,  string

### posts (7 cols | rows≈236)
 string,  string,  string,  string,  string,  string,  string

### profiles (29 cols | rows≈441)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  array,  string,  integer,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  boolean,  string,  string

### promotion_u_campaigns (21 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  boolean,  integer,  number,  integer,  string,  string,  boolean,  string,  string,  string,  string,  string,  string

### promotion_u_claim_attempts (18 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  string,  string,  string,  number,  string,  string,  jsonb

### promotion_u_claims (20 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  string,  string,  number,  integer,  string,  string,  string,  string,  string

### qot_nodes (23 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  integer,  jsonb,  string,  string,  string,  integer,  string,  integer,  string,  string

### rate_limits (6 cols)
 string,  string,  string,  integer,  string,  string

### reactions (5 cols | rows≈0)
 string,  string,  string,  string,  string

### referrals (8 cols)
 string,  string,  string,  string,  string,  string,  jsonb,  string

### reputation_events (8 cols)
 string,  string,  string,  integer,  string,  string,  string,  string

### reviews (9 cols)
 string,  string,  string,  string,  integer,  string,  string,  string,  string

### reward_daily_counters (8 cols)
 string,  string,  string,  string,  string,  integer,  number,  string

### reward_distribution_log (11 cols)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  jsonb,  string

### reward_event_audit_view (14 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  number,  boolean,  string,  string,  string,  number

### reward_event_log (12 cols)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  jsonb

### reward_events (36 cols | rows≈1942)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  boolean,  jsonb,  string,  string,  string,  number,  number,  number,  number,  string,  string,  number,  string,  string,  number,  string,  string,  number,  number,  string,  string,  string,  number

### reward_history_view (14 cols)
 string,  string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  string,  jsonb

### reward_policies (9 cols)
 string,  string,  number,  string,  integer,  integer,  string,  string,  jsonb

### reward_rules (16 cols)
 string,  string,  string,  string,  string,  string,  number,  integer,  integer,  number,  boolean,  boolean,  integer,  jsonb,  string,  string

### roles (7 cols)
 string,  string,  string,  integer,  jsonb,  string,  string

### shares (10 cols)
 string,  string,  string,  string,  string,  string,  integer,  integer,  jsonb,  string

### ticket_checkins (14 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### ticket_current_view (19 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### ticket_history_view (18 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### ticket_products (10 cols)
 string,  string,  string,  string,  number,  integer,  boolean,  integer,  boolean,  string

### ticket_qr_tokens (7 cols)
 string,  string,  string,  string,  boolean,  string,  string

### ticket_summary_view (8 cols)
 string,  integer,  integer,  integer,  integer,  integer,  integer,  integer

### tickets (11 cols | rows≈22)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### treasury_ledger (9 cols)
 string,  string,  string,  number,  string,  string,  string,  jsonb,  string

### treasury_pools (8 cols)
 string,  string,  number,  string,  string,  jsonb,  string,  string

### treasury_transactions (9 cols)
 string,  string,  string,  number,  string,  string,  string,  jsonb,  string

### u_emission_daily (6 cols)
 string,  number,  number,  number,  jsonb,  string

### u_reward_settled_history_view (18 cols)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  jsonb

### user_missions (13 cols)
 string,  string,  string,  string,  integer,  boolean,  string,  integer,  string,  string,  jsonb,  string,  string

### user_network_rank (8 cols)
 string,  integer,  number,  number,  string,  number,  jsonb,  string

### user_notifications (12 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  jsonb

### user_reward_summary_view (8 cols)
 string,  number,  number,  number,  number,  integer,  string,  string

### user_roles (16 cols)
 string,  string,  string,  string,  boolean,  string,  string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string

### wallet_account_asset_bucket_totals (5 cols)
 string,  string,  string,  string,  number

### wallet_accounts (14 cols | rows≈294)
 string,  string,  string,  string,  string,  string,  string,  jsonb,  string,  string,  string,  string,  string,  string

### wallet_asset_balances_view (24 cols)
 string,  string,  string,  string,  string,  string,  integer,  boolean,  boolean,  boolean,  boolean,  boolean,  boolean,  boolean,  string,  number,  number,  number,  number,  number,  number,  string,  string,  string

### wallet_asset_registry (9 cols)
 string,  string,  string,  integer,  boolean,  boolean,  boolean,  string,  string

### wallet_assets (12 cols)
 string,  string,  string,  string,  number,  number,  number,  string,  jsonb,  string,  string,  number

### wallet_assets_unified (10 cols)
 string,  string,  string,  string,  string,  integer,  boolean,  boolean,  boolean,  number

### wallet_available_balances (3 cols)
 string,  string,  number

### wallet_balances (6 cols | rows≈355)
 string,  string,  number,  number,  number,  string

### wallet_balances_unified (3 cols)
 string,  string,  number

### wallet_balances_view (4 cols)
 string,  number,  number,  number

### wallet_conversion_rates (10 cols | rows≈6)
 string,  string,  string,  number,  number,  boolean,  string,  jsonb,  string,  string

### wallet_conversions (11 cols)
 string,  string,  string,  string,  number,  number,  number,  string,  string,  jsonb,  string

### wallet_currencies (10 cols | rows≈3)
 string,  string,  string,  string,  integer,  boolean,  boolean,  boolean,  string,  string

### wallet_economy_bucket_totals_view (7 cols)
 string,  number,  number,  number,  number,  number,  number

### wallet_ledger (35 cols | rows≈2374)
 string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  string,  string,  jsonb,  string,  string,  jsonb,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string

### wallet_ledger_flow_view (20 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  string,  string,  string,  string,  string,  jsonb

### wallet_overview_view (12 cols)
 string,  number,  integer,  integer,  number,  number,  number,  number,  number,  number,  jsonb,  jsonb

### wallet_policies (7 cols)
 string,  string,  string,  jsonb,  boolean,  string,  string

### wallet_supply_cap_status_view (5 cols)
 string,  number,  number,  number,  boolean

### wallet_supply_caps (5 cols)
 string,  number,  jsonb,  string,  string

### wallet_supply_totals (2 cols)
 string,  number

### wallet_transaction_flow_view (25 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  string,  string,  string,  string,  jsonb,  string,  string,  string

### wallet_transaction_history_view (22 cols)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  number,  string,  string,  string,  string,  string,  string,  string,  string

### wallet_transactions (40 cols | rows≈190)
 string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  number,  number,  string,  string,  string,  string,  string,  jsonb,  string,  string,  string,  string,  jsonb,  string,  string,  string,  string,  string,  string,  string,  string,  string,  number,  number,  string,  string,  string,  string,  string

### wallet_treasury_activity_summary_view (5 cols)
 string,  number,  number,  number,  number

### wallet_treasury_balances_view (10 cols)
 string,  string,  string,  string,  number,  number,  number,  number,  number,  number

### wallets (10 cols)
 string,  string,  string,  string,  string,  boolean,  string,  jsonb,  string,  string

### wisdom_memory (5 cols)
 string,  string,  jsonb,  string,  string

### ziwei_audit_log (8 cols)
 string,  string,  string,  string,  string,  jsonb,  jsonb,  string

### ziwei_charts (19 cols)
 string,  string,  string,  boolean,  string,  string,  string,  string,  string,  jsonb,  jsonb,  jsonb,  jsonb,  jsonb,  string,  jsonb,  string,  string,  string

