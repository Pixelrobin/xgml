# General Overview

## Folder System (Adds a folder called 'external' to project)
    GMS2 Project File
        objects
        options
        rooms
        scripts
        other_normal_project_folders
        external
            whatever_folder_names_you_want
                script.xgml
                script2.xgml
            another_folder
                another_script.xgml
                js_script.js
            folder
                other_file_type.png
                whatever.filetype
            xgml_config.json
        GMS2 Project File.yyp

## XGML files
* Run as GML, but limited
* You can only use scripts that aren't tied to running a game itself
* Example: ini_open() would work, draw_text() would not
* Compile to JS, run with Node

## JS files
* Run as normal node files without compiling, have access to a Nodejs library for editing the project
* Would need to be enabled in xgml_config.json to work (otherwise treated as another file type)

## Other files
* Ignored, can be referenced via xgml/js scripts.
* Might be added to gamemaker's 'Included Files', depending on xgml_config.json

## xgml_config.json
    {

        run_js: false                // Whether to run .js scripts with Node
        run_game_on_finish: true     // Whether to compile and run the game using gamemaker's runner after finished
        commit_mode: 'overwrite-add' // Mode for commiting (See 'Running' section for more info below)
        install_folder: 'Installed'  // Default folder to install scripts to

        // Files to not clone into 'Included Files'
        blacklist: [

            "array_of_files.txt",
            "whatever.filetype",
            "also_can_add_directories"

        ]

        // Files to clone into 'Included Files' (Overrides blacklist)
        whitelist: [] // See 'blacklist' example above

    }

## Running and Usage:
* Should be installed globally as an npm project
* xgml init [directory?]
    * initiate gamemaker project directory (argument is optional) for use with xgml. Adds required files.
* xgml commit -r [boolean] -m [mode]
    * -r: whether to run using gamemaker runner on finish or not (overrides gml_config setting)
    * -m: commit mode
        * overwrite-add: overwrite things and add if needed
        * overwrite: overwrite things, don't add anything new
        * add: only add new things
* xgml install [name] [directory?]
    * Install a script/scripts from the internet by name if exists
    * Probably needs some custom solution that works with git... WIP.
    * Could probably just use npm install if this doesn't work out
    * Need some way of letting users submit git repos to a database or something...
* xgml import -d
    * Import 'external' folder from 'Included Files' (In case marketplace assets take advantage of xgml)
    * -d: delete original folder from 'Included Files'

# Syntax [WIP!!!!!]
## Defining Objects
    #object "object_name" {

        // Object properties
        #prop sprite         "sprite_name"
        #prop collision_mask "sprite_name" // Leave null for 'Same as Sprite'
        #prop visible        true
        #prop solid          false
        #prop persistent     false
        #prop parent         "parent_object_name"
        #prop use_physics    true
        #prop fixture        fixture_id // To be created and set up via xgml earlier
        #prop start_awake    true

        // Custom variables
        foo = 0;

        #event create
        // Custom variables are inserted before create event code
        show_debug_message( foo );

        #event step
        foo ++;

        #event draw
        draw_text( 0, 0, foo );

        // All the events (oh boy)
        #event create
        #event destroy
        #event clean_up
        #event alarm                   0             // 0-11
        #event step
        #event begin_step
        #event end_step
        #event collision               "object_name" // object_name can be any object, as long as it exists
        #event keyboard                ord( "K" )    // Use ord() or vk_* constants
        #event keyboard_press          vk_space
        #event keyboard_release        ord( "L" )
        #event mouse_down              mb_left
        #event mouse_pressed           mb_right
        #event mouse_released          mb_any
        #event mouse_enter
        #event mouse_leave
        #event mouse_wheel_up
        #event mouse_wheel_down
        #event global_mouse_down       mb_left
        #event global_mouse_pressed    mb_right
        #event global_mouse_released   mb_any
        #event no_mouse_input
        #event tap
        #event double_tap
        #event drag_start
        #event dragging
        #event drag_end
        #event flick
        #event global_tap
        #event global_double_tap
        #event global_drag_start
        #event global_dragging
        #event global_drag_end
        #event global_flick
        #event outside_room
        #event intersect_boundary
        #event outside_view            0             // 0-7
        #event intersect_view_boundary 0             // 0-7
        #event game_start
        #event game_end
        #event room_start
        #event room_end
        #event animation_end
        #event animation_update
        #event animation_event
        #event path_added
        #event user_event              0             // 0-15
        #event draw
        #event draw_gui
        #event draw_begin
        #event draw_end
        #event draw_gui_begin
        #event draw_gui_end
        #event pre_draw
        #event post_draw
        #event window_resize
        #event async_audio_playback
        #event async_audio_recording
        #event async_cloud
        #event async_dialog
        #event async_http
        #event async_in_app_purchase
        #event async_image_loaded
        #event async_networking
        #event async_push_notification
        #event async_save_load
        #event async_social
        #event async_steam
        #event async_system


    }

## Defining Scripts
    script "script_name( a, b, c, d? )" {

        // Use argument names instead of argumentn
        // Optional arguments are passed as 'undefined' if not added
        if ( d != undefined ) show_message( "hello!" );
        return a * b + c;

    }

## Defining Sprites
    sprite "sprite_name" {

        #prop width                   64
        #prop height                  64
        #prop image                   image_id // To be created and set up with xgml earlier
        #prop tile_horizontally       false
        #prop tile_vertically         false
        #prop seperate_texture_page   false
        #prop group                   // TODO: How do texture groups work again?
        #prop collision_mode          0 // [ auto, full image, manual ]
        #prop collision_type          0 // [ rectangle, ellipse, diamond, precise, precise per frame ]
        #prop tolerance               0 // 0 - 255
        #prop bbox_left               0
        #prop bbox_right              63
        #prop bbox_top                0
        #prop bbox_bottom             63
        #prop origin_x                0
        #prop origin_y                0
        #prop number_of_frames        1
        #prop frames_per_row          1
        #prop frame_width             64
        #prop frame_height            64
        #prop horizontal_cell_offset  0
        #prop vertical_cell_offset    0
        #prop horizontal_pixel_offset 0
        #prop vertical_pixel_offset   0
        #prop horizontal_seperation   0
        #prop vertical_seperation     0

    }

## Etc...