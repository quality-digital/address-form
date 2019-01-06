import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'

export default function getAddressByGeolocation(geolocationProps) {
  const {
    address,
    onChangeAddress,
    rules,
    googleMaps,
  } = geolocationProps

  if (!googleMaps || !address || !rules || !address['number'].value) {
    return
  }

  const geocoder = new googleMaps.Geocoder()

  geocoder.geocode({ address: `${address['number'].value} ${address['street'].value}` }, (results, status) => {
    if (status === googleMaps.GeocoderStatus.OK) {
      if (results[0]) {
        const googleAddress = results[0]
        const autoCompletedAddress = geolocationAutoCompleteAddress(
          address,
          googleAddress,
          rules
        )
        return onChangeAddress({
          ...autoCompletedAddress,
          complement: {
            value: null,
          },
          reference: {
            value: null,
          },
        })
      }
    } else {
      console.warn(`Google Maps Error: ${status}`)
    }
  })
}
