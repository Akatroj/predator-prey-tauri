use pyo3::{prelude::*, types::PyModule};

const PYTHON_CODE: &'static str = include_str!(concat!(
    env!("CARGO_MANIFEST_DIR"),
    "/src-python/src/main.py"
));

pub fn dupa() -> String {
    Python::with_gil(|py| {
        let test = PyModule::from_code(py, PYTHON_CODE, "simulation.py", "simulation")?;
        // TODO: import the module by adding the path to 'os'
        let result: &str = test.getattr("main")?.call0()?.extract()?;

        // println!("{}", result);

        Ok(result.to_owned())
    })
    .unwrap()
    .to_owned()
}
