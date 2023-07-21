import notesStore from '../../../../../store/notes'

type Props = {
    tag: string
}

const Tag = ({tag}: Props) => {
    return (
        <span style={{display: "inline-block", backgroundColor: "#7200a3", color: "white", marginLeft: "3px", paddingLeft: "5px", paddingRight: "5px", borderRadius: "20%"}}
            onClick={() => {
                notesStore.addTagToFilter(tag)
            }}
        >
      {tag}
    </span>
    )
}

export default Tag
