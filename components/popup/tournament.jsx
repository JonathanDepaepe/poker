import Popup from "reactjs-popup";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export const TournamentPopUp = ({closeModal, Open}) => {
    return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="tournament-popup bg-white border rounded-3">
            <div className="modal-content p-4">
                <div className="modal-header">
                    <h5 className="modal-title">JOnathan</h5>
                    <button onClick={() => setOpen(false)} type="button" className="btn-close"
                            data-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                </div>
            </div>
        </div>
    </Popup>
    )
}