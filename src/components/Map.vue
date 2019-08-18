<template>
	<div>
		<iframe ref="map" class="__map_iframe"
			scrolling="no"
			marginheight="0"
			marginwidth="0"
			:src="getMapIframeSrc">
		</iframe>
		<br/>
			<small>
					<a ref="mapLink" :href="getMapLinkHref" target="_blank">View Larger Map</a>
				</small>
			</div>
</template>

<script>

export default {
	name: "Map",
	props: {
		locationTitle: {
			type: String,
			default: ""
		},
		mapZoom: {
			type: String,
			default: "10"
		},
		addressOne: {
			type: String,
			default: ""
		},
		addressOneLat: {
			type: String,
			default: "0"
		},
		addressOneLon: {
			type: String,
			default: "0"
		},
	},
	computed: {
		getMapIframeSrc() {
			return this.getMapLocation(this.addressOneLat, this.addressOneLon);
		},
		getMapLinkHref() {
			return this.getMapLink(this.addressOneLat, this.addressOneLon);
		}
	},
	data() {
		return {
			classes: {
				formFieldError: "section-contact-form__input_wrapper--error"
			}
		};
	},
	methods: {
		getMapLocation(latitude, longitude) {
			const minLat = Number.parseFloat(latitude) - 0.1;
			const maxLat = Number.parseFloat(latitude) + 0.1;
			const minLon = Number.parseFloat(longitude) - 0.25;
			const maxLon = Number.parseFloat(longitude) + 0.25;
			return "https://www.openstreetmap.org/export/embed.html?" +
					"bbox=" + minLon + "%2C" + minLat + "%2C" + maxLon + "%2C" + maxLat +
					"&layer=mapnik" +
					"&marker=" + latitude + "%2C" + longitude;
		},
		getMapLink(latitude, longitude) {
			return "https://www.openstreetmap.org/?" +
					"mlat=" + latitude + "&" +
					"mlon=" + longitude +
					"#map=" + this.mapZoom + "/" + latitude + "/" + longitude;
		},

	}
};
</script>
<style scoped>
.overlay {
  position: relative;
  width: 100%;
  height: 100%;
}

.__map_iframe {
		width: 100%;
		height: 400px;
		border: none;
		box-shadow: $klp-box-shadow;
	}
</style>
