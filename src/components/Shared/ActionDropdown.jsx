import React from "react";

import Confirm from "./Confirm";
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

const ActionDropdown = ({
    onDetailClick,
    onEditClick,
    onDeleteClick,
    onDeleteClickMessage,
    extraItem,
    isActive,
    withoutDelete,
    withoutDetail,
    withoutEdit,
}) => {
    const handleDeleteClick = () => {
        Confirm(onDeleteClickMessage || "Data yang dihapus tidak dapat dipulihkan kembali!").then(
            () => onDeleteClick && onDeleteClick()
        );
    };
    return (
        <React.Fragment>
            <UncontrolledDropdown>
                <DropdownToggle size="sm">
                    <i className="fas fa-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    {!withoutDetail && (
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={onDetailClick && onDetailClick}
                        >
                            <i className="fas fa-eye text-dark"></i>
                        Detail
                        </DropdownItem>
                    )}
                    {!withoutEdit && (
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={onEditClick && onEditClick}
                        >
                            <i className="fas fa-edit text-primary"></i>
                        Edit
                        </DropdownItem>
                    )}
                    {!withoutDelete && (
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={handleDeleteClick}
                        >
                            <i className="fas fa-trash-alt text-danger"></i>
                            Hapus
                        </DropdownItem>
                    )}
                    {extraItem && extraItem}
                </DropdownMenu>
            </UncontrolledDropdown>
        </React.Fragment>
    );
};

export default ActionDropdown;
