<?php
/**
 * Plugin Name: BEI Editorial Design System
 * Description: Enqueues the BEI editorial CSS/JS and provides header/footer shortcodes for use inside Elementor pages.
 * Version: 1.0.0
 * Author: Black Entrepreneurs International
 *
 * Deployment:
 * 1. Copy this folder to wp-content/plugins/bei-design-system/
 * 2. Copy the project's `assets/` folder into this plugin folder (so you have
 *    wp-content/plugins/bei-design-system/assets/css/bei.css and
 *    wp-content/plugins/bei-design-system/assets/js/bei.js).
 * 3. Activate the plugin in WordPress.
 * 4. In Elementor, place [bei_header] at the top of a page and [bei_footer]
 *    at the bottom, using the Custom HTML widget, then build the body.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

require_once __DIR__ . '/directory.php';

function bei_ds_enqueue_assets() {
    $base = plugin_dir_url( __FILE__ );

    wp_enqueue_style(
        'bei-plus-jakarta',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'bei-editorial',
        $base . 'assets/css/bei.css',
        array( 'bei-plus-jakarta' ),
        '1.0.0'
    );

    wp_enqueue_script(
        'bei-editorial-js',
        $base . 'assets/js/bei.js',
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_script(
        'bei-directory-js',
        $base . 'assets/js/bei-directory.js',
        array( 'bei-editorial-js' ),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'bei_ds_enqueue_assets' );

/** Output the injectable masthead mount point. */
function bei_ds_header_shortcode() {
    return '<div id="bei-header"></div>';
}
add_shortcode( 'bei_header', 'bei_ds_header_shortcode' );

/** Output the injectable footer mount point. */
function bei_ds_footer_shortcode() {
    return '<div id="bei-footer"></div>';
}
add_shortcode( 'bei_footer', 'bei_ds_footer_shortcode' );

/** Allow body tags to be marked with data-page without editing templates. */
function bei_ds_body_class( $classes ) {
    if ( is_page() ) {
        $slug = get_post_field( 'post_name', get_queried_object_id() );
        $classes[] = 'bei-page-' . sanitize_html_class( $slug );
    }
    return $classes;
}
add_filter( 'body_class', 'bei_ds_body_class' );
