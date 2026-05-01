# D2 — RLS Policy Synthesis

**Date:** 2026-05-02  
**Source:** supabase/migrations/ (98 migration files)  
**Total policies:** 161  
**Tables with policies:** 77  
**Tables without policies (gap):** 143

---

## Policy Catalog by Table

### activation_analytics (2 policies)
- **activation_analytics_select_own_or_admin** (`SELECT`) USING: `user_id = auth.uid(`
- **activation_analytics_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### activation_growth_snapshots (2 policies)
- **activation_growth_snapshots_admin_select** (`SELECT`) USING: `private.activation_is_admin(`
- **activation_growth_snapshots_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### admin_audit_logs (2 policies)
- **admin_audit_logs_read_policy** (`SELECT`) USING: `actor_user_id = public.fn_resolve_rbac_user_id(auth.uid(`
- **admin_audit_logs_insert_policy** (`INSERT`) WITH CHECK: `actor_user_id = public.fn_resolve_rbac_user_id(auth.uid(`

### admin_economy_controls (2 policies)
- **admin_economy_controls_read_policy** (`SELECT`) USING: `public.fn_is_admin_system_or_higher(auth.uid(`
- **admin_economy_controls_write_policy** (`ALL`) USING: `public.fn_is_admin_system_or_higher(auth.uid(` WITH CHECK: `public.fn_is_admin_system_or_higher(auth.uid(`

### admin_module_controls (2 policies)
- **admin_module_controls_read_policy** (`SELECT`) USING: `public.fn_is_admin_system_or_higher(auth.uid(`
- **admin_module_controls_write_policy** (`ALL`) USING: `public.fn_is_admin_system_or_higher(auth.uid(` WITH CHECK: `public.fn_is_admin_system_or_higher(auth.uid(`

### aier_agent_activity_log (2 policies)
- **aier_agent_activity_log_read_admin_policy** (`SELECT`) USING: `public.fn_aier_agent_is_admin_system_or_higher(auth.uid(`
- **aier_agent_activity_log_write_admin_policy** (`INSERT`) WITH CHECK: `public.fn_aier_agent_is_admin_system_or_higher(auth.uid(`

### aier_agents (2 policies)
- **aier_agents_read_admin_policy** (`SELECT`) USING: `public.fn_aier_agent_is_admin_system_or_higher(auth.uid(`
- **aier_agents_modify_admin_private_policy** (`ALL`) USING: `public.fn_aier_agent_is_admin_private(auth.uid(` WITH CHECK: `public.fn_aier_agent_is_admin_private(auth.uid(`

### aier_command_logs (2 policies)
- **aier_command_logs_select_policy** (`SELECT`) USING: `public.fn_is_admin_private(auth.uid(`
- **aier_command_logs_insert_policy** (`INSERT`) WITH CHECK: `public.fn_is_admin_private(auth.uid(`

### aier_command_queue (3 policies)
- **aier_command_queue_select_policy** (`SELECT`) USING: `public.fn_is_admin_private(auth.uid(`
- **aier_command_queue_insert_policy** (`INSERT`) WITH CHECK: `public.fn_is_admin_private(auth.uid(`
- **aier_command_queue_update_policy** (`UPDATE`) USING: `public.fn_is_admin_private(auth.uid(` WITH CHECK: `public.fn_is_admin_private(auth.uid(`

### aier_license_collections (2 policies)
- **aier_collections_select_authenticated** (`SELECT`) USING: `true`
- **aier_collections_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### aier_license_owners (2 policies)
- **aier_owners_select_own_or_admin** (`SELECT`) USING: `owner_user_id = any(public.fn_resolve_rbac_subject_ids(auth.uid(`
- **aier_owners_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### aier_license_renewals (2 policies)
- **aier_renewals_select_own_or_admin** (`SELECT`) USING: `owner_user_id = any(public.fn_resolve_rbac_subject_ids(auth.uid(`
- **aier_renewals_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### aier_license_royalties (2 policies)
- **aier_royalties_select_own_or_admin** (`SELECT`) USING: `beneficiary_user_id = any(public.fn_resolve_rbac_subject_ids(auth.uid(`
- **aier_royalties_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### aier_license_sales (2 policies)
- **aier_sales_select_authenticated** (`SELECT`) USING: `true`
- **aier_sales_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### aier_license_tokens (2 policies)
- **aier_tokens_select_authenticated** (`SELECT`) USING: `true`
- **aier_tokens_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### audit_logs (6 policies)
- **audit_logs_admin_private_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **audit_logs_admin_private_write** (`INSERT`) WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`
- **audit_logs_evolution_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **audit_logs_evolution_admin_write** (`INSERT`) WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`
- **audit_logs_social_brain_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **audit_logs_social_brain_admin_write** (`INSERT`) WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### autopilot_alerts (2 policies)
- **autopilot_alerts_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **autopilot_alerts_write** (`INSERT`) WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`

### autopilot_approvals (2 policies)
- **autopilot_approvals_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **autopilot_approvals_write** (`ALL`) USING: `public.fn_autopilot_is_admin_private(auth.uid(` WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`

### autopilot_execution_history (2 policies)
- **autopilot_execution_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **autopilot_execution_write** (`ALL`) USING: `public.fn_autopilot_is_admin_private(auth.uid(` WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`

### autopilot_observations (2 policies)
- **autopilot_observations_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **autopilot_observations_write** (`INSERT`) WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`

### autopilot_tasks (2 policies)
- **autopilot_tasks_read** (`SELECT`) USING: `public.fn_autopilot_is_admin_private(auth.uid(`
- **autopilot_tasks_write** (`ALL`) USING: `public.fn_autopilot_is_admin_private(auth.uid(` WITH CHECK: `public.fn_autopilot_is_admin_private(auth.uid(`

### bazi_audit_log (2 policies)
- **bazi_audit_log_select_own** (`SELECT`) USING: `auth.uid(`
- **bazi_audit_log_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`

### bazi_charts (4 policies)
- **bazi_charts_select_own** (`SELECT`) USING: `auth.uid(`
- **bazi_charts_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **bazi_charts_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`
- **bazi_charts_delete_own** (`DELETE`) USING: `auth.uid(`

### burn_events (1 policies)
- **burn_events_select_admin** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### circle_business_commission_allocations (1 policies)
- **circle_business_commission_allocations_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### circle_business_commission_batches (1 policies)
- **circle_business_commission_batches_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### circle_business_commission_configs (1 policies)
- **circle_business_commission_configs_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### cluster_reward_campaigns (2 policies)
- **cluster_reward_campaigns_select_auth** (`SELECT`) USING: `true`
- **cluster_reward_campaigns_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### daily_missions (1 policies)
- **daily_missions_select_own** (`SELECT`) USING: `auth.uid(`

### discovery_recommendations (2 policies)
- **discovery_recommendations_select_auth** (`SELECT`) USING: `true`
- **discovery_recommendations_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### energy_daily (3 policies)
- **energy_daily_select_own** (`SELECT`) USING: `auth.uid(`
- **energy_daily_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **energy_daily_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### energy_events (3 policies)
- **energy_events_select_own** (`SELECT`) USING: `auth.uid(`
- **energy_events_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **energy_events_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### enta_birth_data (3 policies)
- **enta_birth_data_select_own** (`SELECT`) USING: `auth.uid(`
- **enta_birth_data_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_birth_data_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### enta_circle_fields (1 policies)
- **enta_circle_fields_select_authenticated** (`SELECT`) USING: `true`

### enta_connection_events (3 policies)
- **enta_connection_events_select_own** (`SELECT`) USING: `auth.uid(`
- **enta_connection_events_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_connection_events_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### enta_current_fields (3 policies)
- **enta_current_fields_select_own** (`SELECT`) USING: `auth.uid(`
- **enta_current_fields_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_current_fields_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### enta_flow_events (4 policies)
- **enta_flow_events_select_authenticated** (`SELECT`) USING: `true`
- **enta_flow_events_insert_actor** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_flow_events_update_actor** (`UPDATE`) USING: `auth.uid(`
- **enta_flow_events_delete_actor** (`DELETE`) USING: `auth.uid(`

### enta_profiles (3 policies)
- **enta_profiles_select_own** (`SELECT`) USING: `auth.uid(`
- **enta_profiles_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_profiles_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### enta_reward_events (2 policies)
- **enta_reward_events_select_authenticated** (`SELECT`) USING: `true`
- **enta_reward_events_insert_reactor** (`INSERT`) WITH CHECK: `reactor_user_id = auth.uid(`

### enta_root_snapshots (3 policies)
- **enta_root_snapshots_select_own** (`SELECT`) USING: `auth.uid(`
- **enta_root_snapshots_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **enta_root_snapshots_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### evolution_approvals (2 policies)
- **evolution_approvals_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **evolution_approvals_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### evolution_execution_history (2 policies)
- **evolution_execution_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **evolution_execution_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### evolution_proposals (2 policies)
- **evolution_proposals_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **evolution_proposals_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### galaxy_event_proposals (2 policies)
- **galaxy_event_proposals_select_auth** (`SELECT`) USING: `true`
- **galaxy_event_proposals_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### missions (3 policies)
- **missions_select_authenticated** (`SELECT`) USING: `true`
- **missions_admin_manage** (`ALL`) USING: `private.activation_is_admin(` WITH CHECK: `private.activation_is_admin(`
- **missions_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### module_permissions (2 policies)
- **module_permissions_read_policy** (`SELECT`) USING: `true`
- **module_permissions_modify_policy** (`ALL`) USING: `public.fn_is_admin_system_or_higher(auth.uid(` WITH CHECK: `public.fn_is_admin_system_or_higher(auth.uid(`

### network_growth_strategies (2 policies)
- **network_growth_strategies_select_auth** (`SELECT`) USING: `true`
- **network_growth_strategies_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### network_insights (2 policies)
- **network_insights_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **network_insights_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### network_metrics (2 policies)
- **network_metrics_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **network_metrics_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### network_pulse_events (2 policies)
- **network_pulse_events_select_auth** (`SELECT`) USING: `true`
- **network_pulse_events_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### payment_transactions (2 policies)
- **payment_transactions_select_owner** (`SELECT`) USING: `payer_subject_id = auth.uid(`
- **payment_transactions_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### reward_distribution_log (1 policies)
- **reward_distribution_log_select_admin** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### role_permissions (2 policies)
- **role_permissions_read_policy** (`SELECT`) USING: `true`
- **role_permissions_modify_policy** (`ALL`) USING: `public.fn_is_admin_system_or_higher(auth.uid(` WITH CHECK: `public.fn_is_admin_system_or_higher(auth.uid(`

### roles (3 policies)
- **roles_read_authenticated** (`SELECT`) USING: `true`
- **roles_select_authenticated** (`SELECT`) USING: `true`
- **roles_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### simulation_results (2 policies)
- **simulation_results_admin_read** (`SELECT`) USING: `public.fn_evolution_is_admin_private(auth.uid(`
- **simulation_results_admin_write** (`ALL`) USING: `public.fn_evolution_is_admin_private(auth.uid(` WITH CHECK: `public.fn_evolution_is_admin_private(auth.uid(`

### social_brain_approvals (2 policies)
- **social_brain_approvals_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_brain_approvals_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_brain_execution_history (2 policies)
- **social_brain_execution_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_brain_execution_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_brain_proposals (2 policies)
- **social_brain_proposals_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_brain_proposals_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_harmony_scores (2 policies)
- **social_harmony_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_harmony_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_insights (2 policies)
- **social_insights_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_insights_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_predictions (2 policies)
- **social_predictions_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_predictions_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### social_signals (2 policies)
- **social_signals_admin_read** (`SELECT`) USING: `public.fn_social_brain_is_admin_private(auth.uid(`
- **social_signals_admin_write** (`ALL`) USING: `public.fn_social_brain_is_admin_private(auth.uid(` WITH CHECK: `public.fn_social_brain_is_admin_private(auth.uid(`

### treasury_pools (1 policies)
- **treasury_pools_select_admin** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### treasury_transactions (1 policies)
- **treasury_transactions_select_admin** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### u_emission_daily (1 policies)
- **u_emission_daily_select_all** (`SELECT`) USING: `true`

### universe_actions_approval (2 policies)
- **universe_actions_approval_select_auth** (`SELECT`) USING: `true`
- **universe_actions_approval_mutate_admin_private** (`ALL`) USING: `public.is_admin_private(` WITH CHECK: `public.is_admin_private(`

### user_missions (3 policies)
- **user_missions_select_own** (`SELECT`) USING: `user_id = auth.uid(`
- **user_missions_admin_manage** (`ALL`) USING: `private.activation_is_admin(` WITH CHECK: `private.activation_is_admin(`
- **user_missions_service_full** (`ALL`) USING: `true` WITH CHECK: `true`

### user_network_rank (1 policies)
- **user_network_rank_select_all** (`SELECT`) USING: `true`

### user_notifications (2 policies)
- **user_notifications_select_own** (`SELECT`) USING: `auth.uid(`
- **user_notifications_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`

### user_roles (4 policies)
- **user_roles_read_policy** (`SELECT`) USING: `user_id = public.fn_resolve_rbac_user_id(auth.uid(`
- **user_roles_modify_policy** (`ALL`) USING: `public.fn_is_admin_system_or_higher(auth.uid(` WITH CHECK: `public.fn_is_admin_system_or_higher(auth.uid(`
- **user_roles_select_own_or_admin** (`SELECT`) USING: `user_id = any(public.fn_resolve_rbac_subject_ids(auth.uid(`
- **user_roles_service_all** (`ALL`) USING: `true` WITH CHECK: `true`

### wallet_accounts (1 policies)
- **wallet_accounts_select_own** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### wallet_conversions (1 policies)
- **wallet_conversions_select_own** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### wallet_ledger (1 policies)
- **wallet_ledger_select_own** (`SELECT`) USING: `private.phase0_is_finance_admin(`

### wallet_transactions (1 policies)
- **wallet_transactions_select_own** (`SELECT`) USING: `(
    from_financial_subject_id = private.wallet_resolve_subject(auth.uid(`

### wisdom_memory (1 policies)
- **wisdom_memory_select_public** (`SELECT`) USING: `true`

### ziwei_audit_log (2 policies)
- **ziwei_audit_log_select_own** (`SELECT`) USING: `auth.uid(`
- **ziwei_audit_log_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`

### ziwei_charts (4 policies)
- **ziwei_charts_select_own** (`SELECT`) USING: `auth.uid(`
- **ziwei_charts_insert_own** (`INSERT`) WITH CHECK: `auth.uid(`
- **ziwei_charts_update_own** (`UPDATE`) USING: `auth.uid(` WITH CHECK: `auth.uid(`
- **ziwei_charts_delete_own** (`DELETE`) USING: `auth.uid(`

---

## Gap Analysis — Tables Without RLS Policies

The following 143 tables/views exposed via OpenAPI have no detected CREATE POLICY in migrations.
Views inherit no RLS by default; materialized views and system tables are listed for completeness.

- `activity_events`
- `ai_knowledge_blocks`
- `ai_memory_records`
- `ai_messages`
- `ai_threads`
- `ai_training_jobs`
- `aier_logs`
- `aier_tasks`
- `aier_wisdom_vault`
- `anomaly_flags`
- `app_bookings`
- `app_community_posts`
- `app_events`
- `app_memberships`
- `app_posts`
- `app_profile_identity`
- `app_profiles`
- `app_tickets`
- `app_user_roles`
- `app_wallet_accounts`
- `app_wallet_ledger`
- `app_wallet_transactions`
- `app_wallets`
- `assets`
- `availability_slots`
- `badges`
- `booking_availability`
- `booking_current_view`
- `booking_detail_view`
- `booking_guests`
- `booking_holiday_calendar`
- `booking_listing_prices`
- `booking_payment_records`
- `booking_payment_summary_view`
- `booking_refund_requests`
- `booking_summary_view`
- `bookings`
- `cancellations`
- `circle_energy_metrics`
- `circle_members`
- `circle_metrics`
- `circles`
- `comment_media`
- `comments`
- `community_posts`
- `connections`
- `consents`
- `conversations`
- `devices`
- `enta_activity_log`
- `enta_bazi_records`
- `enta_birth_normalizations`
- `enta_change_logs`
- `enta_circle_members`
- `enta_circles`
- `enta_connection_requests`
- `enta_connections`
- `enta_conversation_members`
- `enta_conversations`
- `enta_conversion_test_cases`
- `enta_events`
- `enta_message_reads`
- `enta_messages`
- `enta_posts`
- `enta_presence`
- `enta_resonance_scores`
- `enta_reward_calculations`
- `enta_snapshots`
- `enta_states`
- `enta_typing_states`
- `event_attendances`
- `events`
- `flow_reactions`
- `follows`
- `listings`
- `member_badges`
- `member_tiers`
- `membership_current_view`
- `memberships`
- `messages`
- `network_distribution_events`
- `network_energy_metrics`
- `node_locations`
- `node_policies`
- `node_staff_scopes`
- `nodes`
- `notifications`
- `online_reward_daily_state`
- `online_reward_reservations`
- `orders`
- `payments`
- `posts`
- `profiles`
- `promotion_u_campaigns`
- `promotion_u_claim_attempts`
- `promotion_u_claims`
- `qot_nodes`
- `rate_limits`
- `reactions`
- `referrals`
- `reputation_events`
- `reviews`
- `reward_daily_counters`
- `reward_event_audit_view`
- `reward_event_log`
- `reward_events`
- `reward_history_view`
- `reward_policies`
- `reward_rules`
- `shares`
- `ticket_checkins`
- `ticket_current_view`
- `ticket_history_view`
- `ticket_products`
- `ticket_qr_tokens`
- `ticket_summary_view`
- `tickets`
- `treasury_ledger`
- `u_reward_settled_history_view`
- `user_reward_summary_view`
- `wallet_account_asset_bucket_totals`
- `wallet_asset_balances_view`
- `wallet_asset_registry`
- `wallet_assets`
- `wallet_assets_unified`
- `wallet_available_balances`
- `wallet_balances`
- `wallet_balances_unified`
- `wallet_balances_view`
- `wallet_conversion_rates`
- `wallet_currencies`
- `wallet_economy_bucket_totals_view`
- `wallet_ledger_flow_view`
- `wallet_overview_view`
- `wallet_policies`
- `wallet_supply_cap_status_view`
- `wallet_supply_caps`
- `wallet_supply_totals`
- `wallet_transaction_flow_view`
- `wallet_transaction_history_view`
- `wallet_treasury_activity_summary_view`
- `wallet_treasury_balances_view`
- `wallets`

---

## Policy Coverage Summary

| Domain | Tables | Policies |
|---|---|---|
| wallet | 4 | 4 |
| reward | 1 | 1 |
| enta | 8 | 22 |
| circle | 3 | 3 |
| aier | 10 | 21 |
| ai | 10 | 21 |
| activation | 2 | 4 |
| user | 4 | 10 |
| network | 4 | 8 |
