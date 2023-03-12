use pyo3::{prelude::*, types::PyModule};

pub fn dupa() -> String {
    let code = include_str!("../../src-python/src/main.py");

    let optional: PyResult<String> = Python::with_gil(|py| {
        let test = PyModule::from_code(py, code, "simulation.py", "simulation")?;
        let result: &str = test.getattr("main")?.call0()?.extract()?;

        // println!("{}", result);

        Ok(result.to_owned())
    });

    return match optional {
        Err(e) => {
            println!("{:?}", e);
            "dupa".to_owned()
        }
        Ok(x) => x,
    };
}
