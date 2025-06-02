import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useTranslation } from "react-i18next";

const CuadroBusqueda = ({ searchText, handleSearchChange }) => {
    const { t } = useTranslation();

    return (
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
            <InputGroupText>
                <i className="bi bi-search"></i>
            </InputGroupText>
            <FormControl
                type="text"
                placeholder={t("libros.buscar")}
                value={searchText}
                onChange={handleSearchChange}
            />
        </InputGroup>
    );
};

export default CuadroBusqueda;
