const Notification = ({ message }) => {
  if (!message) return null

  return (
    <div
      style={{
        background: '#dff0d8',
        color: '#3c763d',
        border: '1px solid #3c763d',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
      }}
    >
      {message}
    </div>
  )
}

export default Notification
