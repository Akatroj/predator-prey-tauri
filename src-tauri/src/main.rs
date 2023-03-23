// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// mod get_python;

// use std::{thread, time::Duration};

fn main() {
    pyo3::prepare_freethreaded_python();

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                //   window.close_devtools();
            }

            // let handle = app.handle();

            // let _emitting_thread = thread::spawn(move || {
            //     thread::sleep(Duration::from_millis(5000));

            //     let wait_time = Duration::from_millis(30);

            //     loop {
            //         handle.emit_all("python", get_python::dupa()).unwrap();

            //         thread::sleep(wait_time);
            //     }
            // });

            // emitting_thread.join().expect("Scheduler panicked");

            Ok(())
        })
        // .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
