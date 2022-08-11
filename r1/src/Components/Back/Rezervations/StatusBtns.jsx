import { useContext } from "react";
import BackContext from "../BackContext";

function StatusBtns({ row }) {

  const { setArchive, setStatus, kolts } = useContext(BackContext);

  const koltConfirmed = kolts.filter(k => k.id === row.kolt_id)[0];
  console.log(row.kolt_id);

  const handleConfirm = () => {
    setStatus({ id: row.kolt_id });
  };

  const handleDelete = () => {
    setArchive({ id: row.id });
  };

  return (
    <>
      <div className='btns order'>
        {koltConfirmed.status === 1 ? (
          <button type='button' className='edt book' onClick={handleConfirm}>
            CON-FIRMED
          </button>
        ) : (
          <button type='button' className='edt book pending' onClick={handleConfirm}>
            NOT CONFIR-MED
          </button>
        )}
        <button type='button' className='dlt book' onClick={handleDelete}>
          REM-OVE
        </button>
      </div>
    </>
  )

}

export default StatusBtns;