//Define common styles for project-wide usage
import { StyleSheet } from 'react-native';


 export const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: 16,
	  paddingHorizontal: 5,
	},
	input: {
	  height: 40,
	  borderColor: 'gray',
	  borderWidth: 1,
	  marginBottom: 3,
	  paddingHorizontal: 10,
	},
	inputContainer: {
	  marginHorizontal: 4,
	},
	filterContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  marginBottom: 3,
	},
	filterContent: {
	  flexDirection: 'row',
	  alignItems: 'center',
	},
	filterLabel: {
	  marginRight: 7,
	  paddingHorizontal: 10,
	  fontSize: 16,
	},
	filterText: {
	  marginRight: 5,
	  fontSize: 16,
	},
	buttonContainer: {
	  paddingHorizontal: 30,
	  
	},
	card: {
	  flex: 1,
	  alignItems: 'center',
	  marginBottom: 10,
	  marginHorizontal: 5,
	  backgroundColor: '#fff',
	  padding: 10,
	  borderRadius: 8,
	  elevation: 2,
	},
	image: {
	  width: 150,
	  height: 210,
	},
	row: {
	  justifyContent: 'space-between',
	},
	modal: {
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	modalContainer: {
	  backgroundColor: 'white',
	  padding: 20,
	  borderRadius: 10,
	  width: '80%',
	},
	modalTitle: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginBottom: 10,
	},
	container2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20, // Adjust the padding as needed
	  },
	  title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	  },
	  flatListContent: {
		paddingVertical: 10, // Adjust the padding as needed
	  },
	  card2: {
		flex: 1,
		alignItems: 'center',
		marginHorizontal: 5,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 8,
		elevation: 2,
		marginVertical: 5, // Add vertical margin
	  },
	  //Card Modal
	  modalContainer2: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
	  },
	  cardImage: {
		width: 200,
		height: 280,
		marginBottom: 10,
	  },
	  logoImage: {
		  width: 50,
		height: 50,
	  },
	  types: {
		flexDirection: 'row',
		alignItems: 'center',
	  },
	  typeImage: {
		width: 20,
		height: 20,
	  },
  });