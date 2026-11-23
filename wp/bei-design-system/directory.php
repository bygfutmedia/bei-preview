<?php
/**
 * BEI dynamic directory — native WordPress, no extra directory plugin.
 *
 * Adds a private "Businesses" post type, a REST endpoint at
 * /wp-json/bei/v1/businesses, a meta box for editing each listing, and a
 * [bei_directory] shortcode for Elementor's Custom HTML widget.
 *
 * Editors add/update businesses in WP Admin → Businesses. The public
 * directory reads the REST feed, so no page edits are needed.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ------------------------------------------------------------------------ */
/* Post type                                                                 */
/* ------------------------------------------------------------------------ */
add_action( 'init', function () {
    register_post_type( 'bei_business', array(
        'labels' => array(
            'name'          => __( 'Businesses', 'bei' ),
            'singular_name' => __( 'Business', 'bei' ),
            'add_new_item'  => __( 'Add Business', 'bei' ),
            'edit_item'     => __( 'Edit Business', 'bei' ),
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-store',
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'has_archive'  => false,
        'rewrite'      => false,
    ) );
} );

/* ------------------------------------------------------------------------ */
/* Meta box                                                                  */
/* ------------------------------------------------------------------------ */
add_action( 'add_meta_boxes', function () {
    add_meta_box( 'bei_business_details', __( 'BEI Listing Details', 'bei' ), 'bei_business_meta_box', 'bei_business', 'normal', 'high' );
} );

function bei_business_meta_box( $post ) {
    wp_nonce_field( 'bei_business_save', 'bei_business_nonce' );
    $keys = array(
        'bei_location'   => __( 'Location', 'bei' ),
        'bei_address'    => __( 'Address', 'bei' ),
        'bei_phone'      => __( 'Phone', 'bei' ),
        'bei_email'      => __( 'Email', 'bei' ),
        'bei_website'    => __( 'Website', 'bei' ),
        'bei_categories' => __( 'Categories (comma separated)', 'bei' ),
    );
    echo '<div class="bei-meta-grid">';
    foreach ( $keys as $key => $label ) {
        $value = get_post_meta( $post->ID, $key, true );
        echo '<p><label for="' . esc_attr( $key ) . '"><strong>' . esc_html( $label ) . '</strong></label><br>';
        echo '<input class="widefat" type="text" id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '"></p>';
    }
    echo '</div>';
}

add_action( 'save_post_bei_business', function ( $post_id ) {
    if ( ! isset( $_POST['bei_business_nonce'] ) || ! wp_verify_nonce( $_POST['bei_business_nonce'], 'bei_business_save' ) ) { return; }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
    if ( ! current_user_can( 'edit_post', $post_id ) ) { return; }
    foreach ( array( 'bei_location', 'bei_address', 'bei_phone', 'bei_email', 'bei_website', 'bei_categories' ) as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
        }
    }
} );

/* ------------------------------------------------------------------------ */
/* REST feed — shape matches data/businesses.json                            */
/* ------------------------------------------------------------------------ */
add_action( 'rest_api_init', function () {
    register_rest_route( 'bei/v1', '/businesses', array(
        'methods'             => 'GET',
        'callback'            => 'bei_directory_rest',
        'permission_callback' => '__return_true',
    ) );
} );

function bei_directory_rest() {
    $query = new WP_Query( array(
        'post_type'      => 'bei_business',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'title',
        'order'          => 'ASC',
    ) );

    $items = array();
    foreach ( $query->posts as $post ) {
        $cats = get_post_meta( $post->ID, 'bei_categories', true );
        $cats = array_filter( array_map( 'trim', explode( ',', (string) $cats ) ) );
        $image = get_the_post_thumbnail_url( $post->ID, 'medium' );
        $items[] = array(
            'id'          => $post->post_name,
            'name'        => get_the_title( $post ),
            'description' => wp_strip_all_tags( get_the_content( null, false, $post ) ),
            'location'    => get_post_meta( $post->ID, 'bei_location', true ),
            'address'     => get_post_meta( $post->ID, 'bei_address', true ),
            'phone'       => get_post_meta( $post->ID, 'bei_phone', true ),
            'email'       => get_post_meta( $post->ID, 'bei_email', true ),
            'website'     => get_post_meta( $post->ID, 'bei_website', true ),
            'categories'  => array_values( $cats ),
            'image'       => $image ? $image : plugins_url( 'assets/img/bei-logo.webp', __FILE__ ),
        );
    }
    wp_reset_postdata();
    return rest_ensure_response( array( 'businesses' => $items ) );
}

/* ------------------------------------------------------------------------ */
/* Shortcode for Elementor Custom HTML                                       */
/* ------------------------------------------------------------------------ */
function bei_directory_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'per_page' => 12 ), $atts, 'bei_directory' );
    $source = esc_url( rest_url( 'bei/v1/businesses' ) );

    ob_start();
    ?>
    <section class="section section--ink-2" data-nav="dark" data-bei-directory data-source="<?php echo $source; ?>" data-per-page="<?php echo intval( $atts['per_page'] ); ?>">
      <div class="dir-toolbar">
        <div class="field"><label for="bei-dir-search">Search term</label><input id="bei-dir-search" type="search" data-dir-search placeholder="Name, service, city or keyword"></div>
        <div class="field"><label for="bei-dir-location">Location</label><select id="bei-dir-location" data-dir-location><option value="">All locations</option><option>Asia</option><option>Caribbean</option><option>East Africa</option><option>Europe</option><option>North Africa</option><option>North America</option><option>Oceania</option><option>South Africa</option><option>South America</option><option>UK</option><option>West Africa</option></select></div>
        <div class="field"><label for="bei-dir-category">Category</label><input id="bei-dir-category" type="text" data-dir-category placeholder="All categories"></div>
        <div class="viewtoggle"><button type="button" class="is-active" data-dir-view="list">List</button><button type="button" data-dir-view="grid">Grid</button></div>
      </div>
      <div class="dir-toolbar" style="border-top:0">
        <div class="field"><label>&nbsp;</label><button class="cta-inline" type="button" data-dir-submit>Search <span>&rarr;</span></button></div>
        <div class="field"><label>&nbsp;</label><button class="editorial-link" type="button" data-dir-reset>Reset</button></div>
      </div>
      <div class="dir-count" data-dir-count aria-live="polite"></div>
      <div data-dir-results aria-live="polite"></div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode( 'bei_directory', 'bei_directory_shortcode' );
