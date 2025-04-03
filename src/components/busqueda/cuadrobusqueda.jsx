import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const CuadroBusqueda = ({ searchText, handleSearchChange }) => {
    return (
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
            <InputGroupText>
                <i className="bi bi-search"></i>
            </InputGroupText>
            <FormControl
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={handleSearchChange}
            />
        </InputGroup>
    );
};

export default CuadroBusqueda;
