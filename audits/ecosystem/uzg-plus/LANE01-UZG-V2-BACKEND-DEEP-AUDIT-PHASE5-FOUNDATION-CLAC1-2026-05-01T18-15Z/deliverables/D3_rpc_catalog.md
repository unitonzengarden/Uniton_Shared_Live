# D3 — RPC Signature Catalog

**Date:** 2026-05-02  
**Source:** Supabase REST OpenAPI spec /rest/v1/  
**Total RPCs:** 188  

---

## Summary by Domain

| Domain | Count |
|---|---|
| AIER | 1 |
| Activation | 11 |
| Auth/Profile | 9 |
| Booking | 18 |
| Chat | 12 |
| Circles/ENTA | 17 |
| ENTA/Astro | 24 |
| Membership | 3 |
| Network/Social | 9 |
| Other | 43 |
| Promotions | 4 |
| Rewards/Treasury | 25 |
| System | 2 |
| Wallet | 10 |

---

## AIER (1 functions)

### is_aier
**Params:** `(none)`  

## Activation (11 functions)

### rpc_activation_get_dashboard
**Params:** `p_subject_id: string`  

### rpc_activation_get_metrics
**Params:** `p_hours: integer`  

### rpc_activation_growth_get_overview
**Params:** `p_trend_days: integer`  

### rpc_activation_growth_refresh_snapshot
**Params:** `p_snapshot_date: string`  

### rpc_activation_record_activity
**Params:** `p_activity_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string, p_units: integer`  

### rpc_activation_refresh_all_analytics
**Params:** `(none)`  

### rpc_activation_refresh_analytics
**Params:** `p_subject_id: string`  

### rpc_activation_reset_daily_missions
**Params:** `p_run_date: string`  

### rpc_activation_seed_defaults
**Params:** `(none)`  

### rpc_activation_set_mission_status
**Params:** `p_is_active: boolean, p_mission_id: string`  

### rpc_activation_upsert_mission
**Params:** `p_daily_limit: integer, p_description: string, p_goal_count: integer, p_growth_multiplier: number, p_is_active: boolean, p_is_daily: boolean, p_metadata: jsonb, p_mission_id: string, p_mission_type: string, p_reward_amount: number, p_reward_asset: string, p_title: string`  

## Auth/Profile (9 functions)

### fn_autopilot_is_admin_private
**Params:** `p_user_id: string`  

### fn_bootstrap_profile
**Params:** `(none)`  

### fn_collect_rbac_roles
**Params:** `p_user_id: string`  

### fn_is_admin_private
**Params:** `p_user_id: string`  

### fn_is_admin_system_or_higher
**Params:** `p_user_id: string`  

### fn_normalize_legacy_admin_role
**Params:** `p_role: string`  

### fn_resolve_rbac_subject_ids
**Params:** `p_any_user_id: string`  

### fn_resolve_rbac_user_id
**Params:** `p_any_user_id: string`  

### is_admin
**Params:** `(none)`  

## Booking (18 functions)

### booking_actor_user
**Params:** `p_user_id: string`  

### booking_is_holiday
**Params:** `p_stay_date: string`  

### booking_is_staff
**Params:** `p_user_id: string`  

### booking_release_availability_for_booking
**Params:** `p_booking_id: string`  

### booking_require_staff
**Params:** `p_user_id: string`  

### booking_resolve_allowed_status
**Params:** `p_candidates: array, p_fallback: string`  

### booking_resolve_listing_price
**Params:** `p_listing_id: string, p_stay_date: string`  

### booking_seed_availability_range
**Params:** `p_check_in_date: string, p_check_out_date: string, p_listing_id: string, p_note: string`  

### booking_status_allowed
**Params:** `p_status: string`  

### can_read_booking
**Params:** `p_booking_id: string`  

### rpc_cancel_booking
**Params:** `p_booking_id: string, p_reason: string, p_staff_user_id: string`  

### rpc_checkin_booking
**Params:** `p_booking_id: string, p_staff_user_id: string`  

### rpc_checkout_booking
**Params:** `p_booking_id: string, p_staff_user_id: string`  

### rpc_confirm_booking
**Params:** `p_booking_id: string, p_note: string, p_staff_user_id: string`  

### rpc_create_booking_request
**Params:** `p_check_in_date: string, p_check_out_date: string, p_guest_count: integer, p_listing_id: string, p_note: string, p_primary_guest_email: string, p_primary_guest_full_name: string, p_primary_guest_phone: string, p_user_id: string`  

### rpc_payment_booking
**Params:** `p_amount: number, p_asset_code: string, p_booking_id: string, p_buyer_subject_id: string, p_idempotency_key: string, p_metadata: jsonb`  

### rpc_prepare_refund_booking
**Params:** `p_booking_id: string, p_reason: string, p_refund_amount: number, p_staff_user_id: string`  

### rpc_record_booking_payment
**Params:** `p_amount: number, p_booking_id: string, p_note: string, p_payment_channel: string, p_payment_method: string, p_payment_status: string, p_staff_user_id: string, p_transaction_reference: string`  

## Chat (12 functions)

### mark_message_read
**Params:** `p_conversation_id: string, p_message_id: string`  

### rpc_create_direct_conversation
**Params:** `p_other_user_id: string`  

### rpc_create_flow_conversation
**Params:** `flow_id: string, title: string`  

### rpc_get_conversation_messages
**Params:** `p_before_created_at: string, p_conversation_id: string, p_limit_count: integer`  

### rpc_get_conversation_state
**Params:** `p_conversation_id: string`  

### rpc_get_inbox
**Params:** `p_limit_count: integer`  

### rpc_get_my_conversations
**Params:** `p_limit_count: integer`  

### rpc_get_or_create_direct_conversation
**Params:** `p_other_user_id: string`  

### rpc_mark_conversation_read
**Params:** `p_conversation_id: string, p_message_id: string`  

### rpc_mark_message_read
**Params:** `p_conversation_id: string, p_message_id: string`  

### rpc_send_message
**Params:** `p_conversation_id: string, p_message_body: string, p_message_type: string, p_metadata: jsonb, p_reply_to_message_id: string`  

### send_message
**Params:** `p_conversation_id: string, p_message_body: string, p_message_type: string, p_metadata: jsonb, p_reply_to_message_id: string`  

## Circles/ENTA (17 functions)

### build_circles
**Params:** `(none)`  

### can_manage_circle
**Params:** `p_circle_id: string`  

### can_read_circle
**Params:** `p_circle_id: string`  

### enta_rls_can_view_circle
**Params:** `p_circle_id: string, p_profile_id: string`  

### enta_rls_current_profile_id
**Params:** `(none)`  

### enta_rls_is_conversation_member
**Params:** `p_conversation_id: string, p_user_id: string`  

### rpc_circle_business_commission_settle
**Params:** `p_allocations: jsonb, p_circle_id: string, p_circle_slug: string, p_commission_pool_amount: number, p_commission_rate_percent: number, p_config_snapshot: jsonb, p_executed_by_profile_id: string, p_idempotency_key: string, p_metadata: jsonb, p_owner_profile_id: string, p_period_end: string, p_period_start: string, p_revenue_total: number`  

### rpc_create_circle
**Params:** `p_description: string, p_name: string, p_slug: string, p_visibility: string`  

### rpc_create_circle_conversation
**Params:** `circle_id: string, title: string`  

### rpc_get_circle_conversation
**Params:** `p_circle_id: string, p_title: string`  

### rpc_get_circle_members
**Params:** `limit_count: integer, p_circle_id: string`  

### rpc_get_circle_multiplier
**Params:** `p_circle_id: string`  

### rpc_get_circle_summary
**Params:** `p_circle_id: string`  

### rpc_get_my_circles
**Params:** `limit_count: integer`  

### rpc_join_circle
**Params:** `p_circle_id: string`  

### rpc_leave_circle
**Params:** `p_circle_id: string`  

### rpc_record_circle_energy_metric
**Params:** `p_activity: number, p_ces: number, p_circle_id: string, p_cross_connections: number, p_members: integer, p_retention: number`  

## ENTA/Astro (24 functions)

### calc_enta_profile
**Params:** `p_day: integer, p_gender: string, p_hour: string, p_month: integer, p_year: integer`  

### enta_is_conversation_member
**Params:** `p_conversation_id: string`  

### fn_enta_suggest_resonance
**Params:** `p_limit_count: integer, p_user_id: string`  

### rpc_can_update_enta_birth_core
**Params:** `(none)`  

### rpc_can_update_enta_profile
**Params:** `(none)`  

### rpc_compute_enta_state
**Params:** `(none)`  

### rpc_compute_enta_state_v2
**Params:** `(none)`  

### rpc_create_enta_profile
**Params:** `p_birth_day: integer, p_birth_hour_branch: string, p_birth_hour_estimated: boolean, p_birth_month: integer, p_birth_year: integer, p_current_theme_mode: string, p_dominant_element_override: string, p_gender: string, p_theme_preference: string`  

### rpc_get_enta_bazi_record
**Params:** `(none)`  

### rpc_get_enta_birth_normalization
**Params:** `(none)`  

### rpc_get_enta_canonical_record
**Params:** `(none)`  

### rpc_get_enta_profile
**Params:** `(none)`  

### rpc_get_enta_snapshots
**Params:** `limit_count: integer`  

### rpc_get_enta_state
**Params:** `(none)`  

### rpc_needs_enta_recompute
**Params:** `(none)`  

### rpc_recompute_enta_state
**Params:** `target_user_id: string`  

### rpc_update_enta_birth_core
**Params:** `p_bazi_payload: jsonb, p_birth_country_code: string, p_birth_timezone: string, p_calendar_input_type: string, p_certainty_level: string, p_certainty_score: number, p_display_name: string, p_full_name: string, p_gender: string, p_normalized_lunar_payload: jsonb, p_normalized_solar_datetime: string, p_raw_birth_payload: jsonb, p_reason: string`  

### rpc_update_enta_profile
**Params:** `p_birth_day: integer, p_birth_hour_branch: string, p_birth_hour_estimated: boolean, p_birth_month: integer, p_birth_year: integer, p_current_theme_mode: string, p_dominant_element_override: string, p_gender: string, p_reason: string, p_theme_preference: string`  

### rpc_update_enta_profile_identity
**Params:** `p_bio: string, p_display_name: string, p_full_name: string, p_locale: string, p_notes: string`  

### rpc_upsert_enta_connection_event
**Params:** `p_breakdown: jsonb, p_compensation_score: number, p_destabilize_score: number, p_dominant_pair: string, p_edge_type: string, p_event_at: string, p_flow_alignment: number, p_interaction_density: number, p_issues: jsonb, p_resonance_score: number, p_source_status: string, p_user_from: string, p_user_to: string`  

### rpc_upsert_enta_current_field
**Params:** `p_breakdown: jsonb, p_circle_component: jsonb, p_computed_at: string, p_contribution_weights: jsonb, p_current_element_percentages: jsonb, p_dominant_element: string, p_element_sum: number, p_interaction_component: jsonb, p_issues: jsonb, p_network_component: jsonb, p_polarity: jsonb, p_rhythm_score: number, p_rhythm_status: string, p_root_component: jsonb, p_source_status: string, p_sum_rule_ok: boolean, p_user_id: string`  

### rpc_upsert_enta_profile
**Params:** `p_birth_day: integer, p_birth_hour_branch: string, p_birth_hour_estimated: boolean, p_birth_month: integer, p_birth_year: integer, p_current_theme_mode: string, p_dominant_element_override: string, p_gender: string, p_reason: string, p_theme_preference: string`  

### rpc_upsert_enta_profile_v2
**Params:** `p_bazi_payload: jsonb, p_birth_country_code: string, p_birth_timezone: string, p_calendar_input_type: string, p_certainty_level: string, p_certainty_score: number, p_display_name: string, p_full_name: string, p_gender: string, p_normalized_lunar_payload: jsonb, p_normalized_solar_datetime: string, p_raw_birth_payload: jsonb, p_reason: string`  

### rpc_upsert_enta_root_snapshot
**Params:** `p_balance_score: number, p_bazi_record: jsonb, p_calendar_input_type: string, p_certainty_level: string, p_certainty_score: number, p_dominant_element: string, p_element_code: string, p_element_sum: integer, p_issues: jsonb, p_positions_total: integer, p_root_element_counts: jsonb, p_root_element_percentages: jsonb, p_root_payload: jsonb, p_snapshot_at: string, p_source_status: string, p_sum_rule_ok: boolean, p_timezone: string, p_user_id: string, p_yin_yang_counts: jsonb, p_yin_yang_ratio: jsonb`  

## Membership (3 functions)

### bootstrap_membership_for_user
**Params:** `p_user_id: string`  
**Summary:** Creates default active membership for a user. Fixed to use text[] for member_tiers.benefits. Safe to call repeatedly.  

### fn_membership_subscribe
**Params:** `tier_code: string`  

### rpc_payment_membership
**Params:** `p_amount: number, p_asset_code: string, p_idempotency_key: string, p_membership_plan_id: string, p_metadata: jsonb, p_subscriber_subject_id: string`  

## Network/Social (9 functions)

### rpc_accept_connection
**Params:** `connection_id: string`  

### rpc_get_connection_requests
**Params:** `limit_count: integer`  

### rpc_get_connection_suggestions
**Params:** `limit_count: integer`  

### rpc_get_my_connections
**Params:** `limit_count: integer`  

### rpc_get_network_multiplier
**Params:** `p_date: string`  

### rpc_record_network_energy_metrics
**Params:** `p_active_users: integer, p_circle_activity: integer, p_date: string, p_messages: integer, p_nei: number, p_new_connections: integer, p_retention: number`  

### rpc_reject_connection
**Params:** `connection_id: string`  

### rpc_sync_energy_daily
**Params:** `p_event_date: string, p_user_id: string`  

### suggest_connections
**Params:** `p_limit_count: integer`  

## Other (43 functions)

### bootstrap_tickets_foundation
**Params:** `(none)`  

### bootstrap_wallet_for_user
**Params:** `p_user_id: string`  

### can_read_event_attendance
**Params:** `p_event_id: string, p_user_id: string`  

### can_read_payment
**Params:** `p_payment_id: string`  

### can_read_post
**Params:** `p_author_user_id: string, p_circle_id: string, p_status: string, p_visibility: string`  

### codex_debug_wallet_dupes
**Params:** `(none)`  

### current_user_id
**Params:** `(none)`  

### fn_autopilot_apply_approval
**Params:** `p_status: string, p_task_id: string`  

### fn_autopilot_log_action
**Params:** `p_details: jsonb, p_executor: string, p_result: string, p_task_id: string`  

### fn_get_user_role_context
**Params:** `p_user_id: string`  

### fn_role_label_from_code
**Params:** `p_role_code: string`  

### fn_role_priority_from_code
**Params:** `p_role_code: string`  

### fn_ticket_order_create
**Params:** `product_id: string, qty: integer`  

### fn_try_uuid
**Params:** `p_value: string`  

### fn_user_has_any_role
**Params:** `p_role_codes: array, p_user_id: string`  

### fn_user_has_role
**Params:** `p_role_code: string, p_user_id: string`  

### fn_user_highest_role
**Params:** `p_user_id: string`  

### fn_wallet_transfer_credits
**Params:** `amount: number, note: string, receiver_email: string`  

### has_active_role
**Params:** `target_role: string`  

### has_staff_scope
**Params:** `p_node_id: string, p_scopes: array`  

### is_staff
**Params:** `(none)`  

### qot_refresh_propagation_counts_for_root
**Params:** `p_root_id: string`  

### rpc_burn_asset
**Params:** `p_amount: number, p_asset_code: string, p_idempotency_key: string, p_metadata: jsonb, p_reason: string, p_reference_id: string, p_subject_id: string`  

### rpc_calculate_resonance
**Params:** `p_other_user_id: string`  

### rpc_calculate_resonance_score
**Params:** `p_event_weight: number, p_metadata: jsonb, p_subject_id: string`  

### rpc_compute_enta
**Params:** `(none)`  

### rpc_connect_user
**Params:** `target_user_id: string`  

### rpc_convert_u_to_uzg
**Params:** `p_amount: number, p_user_id: string`  

### rpc_create_payment_transaction
**Params:** `p_amount: number, p_asset_code: string, p_idempotency_key: string, p_metadata: jsonb, p_payer_subject_id: string, p_receiver_subject_id: string, p_reference_id: string, p_transaction_type: string`  

### rpc_get_flow_reaction_summary
**Params:** `p_target_id: string, p_target_type: string`  

### rpc_get_influence_multiplier
**Params:** `p_user_id: string`  

### rpc_marketplace_purchase
**Params:** `p_amount: number, p_asset_code: string, p_buyer_subject_id: string, p_idempotency_key: string, p_listing_id: string, p_metadata: jsonb, p_seller_subject_id: string`  

### rpc_payment_ticket
**Params:** `p_amount: number, p_asset_code: string, p_buyer_subject_id: string, p_idempotency_key: string, p_metadata: jsonb, p_ticket_id: string`  

### rpc_react_flow_element
**Params:** `p_actor_id: string, p_element_type: string, p_metadata: jsonb, p_target_id: string, p_target_type: string`  

### rpc_set_presence
**Params:** `p_current_conversation_id: string, p_status: string`  

### rpc_set_typing
**Params:** `p_conversation_id: string, p_is_typing: boolean, p_ttl_seconds: integer`  

### rpc_set_typing_state
**Params:** `p_conversation_id: string, p_is_typing: boolean, p_ttl_seconds: integer`  

### rpc_sync_daily_missions
**Params:** `p_event_date: string, p_user_id: string`  

### rpc_transfer_uzg
**Params:** `p_amount: number, p_from: string, p_to: string`  

### rpc_update_presence
**Params:** `p_current_conversation_id: string, p_status: string`  

### ticket_check_in_by_qr
**Params:** `p_staff_user_id: string, p_ticket_code: string`  

### ticket_issue_counter_sale
**Params:** `p_product_id: string, p_qr_payload: string, p_staff_user_id: string, p_ticket_code: string`  

### update_typing_state
**Params:** `p_conversation_id: string, p_is_typing: boolean, p_ttl_seconds: integer`  

## Promotions (4 functions)

### rpc_cancel_promotion_u_claim_distribution
**Params:** `p_claim_id: string, p_reason: string, p_user_id: string`  

### rpc_finalize_promotion_u_claim_distribution
**Params:** `p_claim_id: string, p_reward_distribution_log_id: string, p_reward_event_id: string, p_treasury_ledger_id: string, p_user_id: string, p_wallet_ledger_id: string`  

### rpc_get_promotion_u_campaign_state
**Params:** `p_campaign_code: string, p_request_country_code: string, p_request_timezone: string, p_user_id: string`  

### rpc_prepare_promotion_u_claim_distribution
**Params:** `p_campaign_code: string, p_request_country_code: string, p_request_timezone: string, p_user_id: string`  

## Rewards/Treasury (25 functions)

### fn_reward_daily_cap_by_rank
**Params:** `p_rank: string`  

### rpc_activation_publish_pending_rewards
**Params:** `p_limit: integer, p_subject_id: string`  

### rpc_calculate_enta_reward
**Params:** `p_asset_code: string, p_circle_id: string, p_event_type: string, p_event_value: number, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string`  

### rpc_cancel_online_reward_distribution
**Params:** `p_reservation_id: string, p_user_id: string`  

### rpc_create_reward_event
**Params:** `p_actor_user_id: string, p_circle_id: string, p_conversation_id: string, p_event_type: string, p_message_id: string, p_metadata: jsonb, p_quality_pass: boolean, p_quality_score: number, p_source_id: string, p_source_table: string, p_target_user_id: string`  

### rpc_emit_and_process_reward_event
**Params:** `p_actor_user_id: string, p_circle_id: string, p_conversation_id: string, p_event_type: string, p_message_id: string, p_metadata: jsonb, p_quality_pass: boolean, p_quality_score: number, p_source_id: string, p_source_table: string, p_target_user_id: string`  

### rpc_emit_reward_event
**Params:** `p_asset_code: string, p_event_type: string, p_event_value: number, p_idempotency_key: string, p_metadata: jsonb, p_multiplier: number, p_reference_id: string, p_subject_id: string`  

### rpc_emit_u_reward
**Params:** `p_amount: number, p_event: string, p_metadata: jsonb, p_user_id: string`  

### rpc_finalize_online_reward_distribution
**Params:** `p_reservation_id: string, p_reward_event_id: string, p_user_id: string`  

### rpc_get_reward_engine_context
**Params:** `p_circle_id: string, p_date: string, p_user_id: string`  

### rpc_get_u_emission_snapshot
**Params:** `p_date: string`  

### rpc_get_user_reward_history
**Params:** `p_limit: integer, p_offset: integer`  

### rpc_get_user_reward_settled_history
**Params:** `p_limit: integer, p_offset: integer, p_user_id: string`  

### rpc_get_user_reward_settled_summary
**Params:** `p_user_id: string`  

### rpc_get_user_reward_summary
**Params:** `p_user_id: string`  

### rpc_initialize_treasury_pools
**Params:** `(none)`  

### rpc_network_reward_distribution
**Params:** `p_asset_code: string, p_distribution_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_target_scope: jsonb, p_total_amount: number`  

### rpc_prepare_online_reward_distribution
**Params:** `p_last_seen_at: string, p_presence_status: string, p_user_id: string`  

### rpc_process_enta_reward_event
**Params:** `p_circle_id: string, p_event_type: string, p_metadata: jsonb, p_source_id: string, p_source_type: string, p_user_id: string`  

### rpc_process_enta_reward_event_v2
**Params:** `p_circle_id: string, p_event_type: string, p_metadata: jsonb, p_source_id: string, p_source_type: string, p_user_id: string`  

### rpc_process_reward_event
**Params:** `p_reward_event_id: string`  

### rpc_process_wallet_reward_interaction
**Params:** `p_circle_id: string, p_decay_factor: number, p_event_type: string, p_metadata: jsonb, p_quality_score: number, p_source_id: string, p_source_type: string, p_user_id: string`  

### rpc_treasury_deposit
**Params:** `p_amount: number, p_asset_code: string, p_idempotency_key: string, p_metadata: jsonb, p_pool_type: string, p_reference_id: string, p_subject_id: string`  

### rpc_treasury_distribute
**Params:** `p_amount: number, p_asset_code: string, p_event_type: string, p_idempotency_key: string, p_metadata: jsonb, p_pool_type: string, p_reference_id: string, p_subject_id: string`  

### rpc_treasury_distribute_u
**Params:** `p_amount: number, p_event_type: string, p_metadata: jsonb, p_pool_type: string, p_reference_id: string, p_user_id: string`  

## System (2 functions)

### execute_sql
**Params:** `query: string`  

### get_schema_tables
**Params:** `(none)`  

## Wallet (10 functions)

### rpc_wallet_burn_asset
**Params:** `p_amount: number, p_asset_type: string, p_idempotency_key: string, p_metadata: jsonb, p_subject_id: string`  

### rpc_wallet_convert_asset
**Params:** `p_amount: number, p_from_asset: string, p_idempotency_key: string, p_metadata: jsonb, p_subject_id: string, p_to_asset: string`  

### rpc_wallet_credit
**Params:** `p_amount: number, p_asset_type: string, p_entry_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string`  

### rpc_wallet_credit_asset
**Params:** `p_amount: number, p_asset_code: string, p_entry_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string`  

### rpc_wallet_debit
**Params:** `p_amount: number, p_asset_type: string, p_entry_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string`  

### rpc_wallet_debit_asset
**Params:** `p_amount: number, p_asset_code: string, p_entry_type: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_subject_id: string`  

### rpc_wallet_get_assets
**Params:** `p_subject_id: string`  

### rpc_wallet_get_balance
**Params:** `p_asset_type: string, p_subject_id: string`  

### rpc_wallet_transfer
**Params:** `p_amount: number, p_asset_type: string, p_from_subject_id: string, p_idempotency_key: string, p_metadata: jsonb, p_reference_id: string, p_to_subject_id: string`  

### wallet_create_demo_transaction_for_user
**Params:** `p_user_id: string`  

