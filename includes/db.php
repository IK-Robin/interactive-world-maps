<?php


function rdata_plugin_create_tables()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "
        CREATE TABLE $table_name (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `map_id` varchar(11) DEFAULT NULL,
            `title` varchar(100) DEFAULT NULL,
            `map_des` varchar(100) DEFAULT NULL,
            `hov_color` varchar(7) DEFAULT NULL,
            `fill_color` varchar(7) DEFAULT NULL,
            `click_color` varchar(7) DEFAULT NULL,
            `map_link` varchar(150) DEFAULT NULL,
            `map_img` varchar(150) DEFAULT NULL,
            PRIMARY KEY (`id`)
        ) $charset_collate;
    ";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
