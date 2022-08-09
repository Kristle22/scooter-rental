function BookGroup({ color }) {
  // const [user, setUser] = useState(null);
  // const [selectId, setSelectId] = useState('0');
  // const [selectCode, setSelectCode] = useState('0');

  // const chooseKolt = (e) => {
  //   setSelectId(e.target.value);
  //   const regCodes = kolt.regCodes.split(',');
  //   let code = '';
  //   let count = 1;
  //   for (let i = 0; i < regCodes.length; i++) {
  //     count++;
  //     code += regCodes.join('').slice(i * 8, count * 8);
  //     setSelectCode(code);
  //   }
  // };

  return (
    <div className='flex-container group'>
      <ol>
        <h2>Reg. Code</h2>
        {color.regCodes &&
          color.regCodes.split(',').map((code, i) => <li key={i}>{code}</li>)}
      </ol>
      <ul>
        <h2>Last used</h2>
        {color.lastUses
          ? color.lastUses.split(',').map((last, j) => (
              <li key={j}>
                {new Date(last).toUTCString().slice(4, -7)}
                {/* {new Date(last).toLocaleTimeString()} */}
              </li>
            ))
          : null}
      </ul>
      <ul>
        <h2>Total Ride</h2>
        {color.totalRides &&
          color.totalRides
            .split(',')
            .map((total, k) => <li key={k}>{total}_km.</li>)}
      </ul>
      <ul>
        <h2>Ready to use</h2>
        {color.statuses &&
          color.statuses.split(',').map((stat, l) =>
            Number(stat) === 1 ? (
              <li key={l} className='isAvailable'>
                Available
              </li>
            ) : (
              <li className='isBusy'>Busy</li>
            )
          )}
      </ul>
      <ul></ul>
    </div>
  );
}

export default BookGroup;
