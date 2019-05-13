import React from 'react'
import { connect } from 'react-redux'
import '../../components/DisplayPalette/DisplayPalette.css'
import { setPalettes } from '../../actions'
import { handleDelete } from '../../thunks/handlePalettes'
export const EditPalette = (props) => {
  const { id, palette_name, color_1, color_2, color_3, color_4, color_5 } = props.palette
  const { palettes } = props

  const deletePalette = (id) => {
    const updatedPalettes = palettes.filter(palette => { 
      return palette.id !== id
    })
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}`
    props.handleDelete(url, setPalettes, updatedPalettes, id)
  }

  return(
    <div className='edit-palette-card'>
      <div className='palette-card edit-palette'>
        <h3 className='palette-name'>
          {palette_name}
        </h3>
        <div className='display-colors'>
          <div style={{backgroundColor: color_1}} className='display-color'></div>
          <div style={{backgroundColor: color_2}} className='display-color'></div>
          <div style={{backgroundColor: color_3}} className='display-color'></div>
          <div style={{backgroundColor: color_4}} className='display-color'></div>
          <div style={{backgroundColor: color_5}} className='display-color'></div>
        </div>
      </div>
      <div className='delete-palette' onClick={() => deletePalette(id)}><i className="far fa-trash-alt"></i></div>
    </div>
  )
}

export const mapStateToProps = (state) => ({
  palettes: state.palettes,
})

export const mapDispatchToProps = (dispatch) => ({
  handleDelete: (url, action, items, id) => dispatch(handleDelete(url, action, palettes, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPalette)

