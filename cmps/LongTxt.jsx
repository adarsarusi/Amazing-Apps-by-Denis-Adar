const { useState } = React

export function LongTxt({ txt, length = 100, isButton = true, className }) {
  let shortText = txt.substring(0, length)
  let longText = txt
  let textToDisplay = ''

  const isLong = txt.length > length

  const [readMore, setReadMore] = useState(false)

  if (readMore) textToDisplay = longText
  else textToDisplay = shortText

  function toggleReadMore() {
    setReadMore((prev) => !prev)
  }

  return (
    <p className={className}>
      {textToDisplay}
      {!readMore && isLong && '...'}
      <br />
      {isButton && (
        <span className="book-read-more" onClick={toggleReadMore}>
          {readMore ? ' show less' : ' read more'}
        </span>
      )}
    </p>
  )
}
