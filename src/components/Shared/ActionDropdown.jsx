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
    onActiveClick,
    onDeleteClick,
    onNonactiveClick,
    extraItem,
    isActive,
    withoutActive,
    withoutNonactive,
    withoutDelete,
    withoutDetail,
    withoutEdit,
}) => {
    const handleDeleteClick = () => {
        Confirm("Data yang dihapus tidak dapat dipulihkan kembali!").then(
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
                            <i className="fas fa-eye text-primary"></i>
                        Detail
                        </DropdownItem>
                    )}
                    {!withoutEdit && (
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={onEditClick && onEditClick}
                        >
                            <i className="fas fa-pencil-alt text-info"></i>
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
