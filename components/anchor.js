import * as React from 'react'

export class Anchor extends React.Component {

  render () {
    return <div className="anchor" id={this.props.id}><a href={"#"+this.props.id}>{this.props.children}</a></div>
  }
}

export const Anchored = WithAnchors => class extends React.Component {
  componentDidMount () {
    console.log(window.location.hash, this.props.id)
    if (window.location.hash.length > 0){
       document.querySelector(window.location.hash).scrollIntoView()
    }
  }
  componentDidUpdate (prevProps) {
    if ((this.props.location.hash != prevProps.location.hash) && this.props.location.hash.length > 0) {
        document.querySelector(window.location.hash).scrollIntoView()
    }
  }
  render() {
    return <WithAnchors {...this.props} />
  }
}
Anchored.contextTypes = {
    router: React.PropTypes.object
  }
