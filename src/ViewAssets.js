// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   IconButton,
// } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const ViewAssets = () => {
//   const [loading, setLoading] = useState(true);
//   const [assets, setAssets] = useState([]);
//   const [editingAsset, setEditingAsset] = useState(null);
//   const [assetAttributes, setAssetAttributes] = useState([]);

//   const token = useSelector((state) => state.auth.token);

//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get(`/apigateway/hrms/masterAsset/getAllAssetInfoByAssetTypeIdAndPagination/10?page0=0&size=10`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//         setAssets(response.data.content);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching assets:', error);
//         toast.error(error.response?.data?.message || "Failed to fetch assets");
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchAssetTypeData();
//   }, []);

//   const fetchAssetTypeData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/apigateway/hrms/masterAsset/getAllAssetType`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAssetTypeData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching asset type data", error);
//       toast.error(error.response?.data?.message || "Failed to fetch asset type data");
//       setLoading(false);
//     }
//   };
//   const handleDeleteAsset = async (assetId) => {
//     try {
//       await axios.delete(`/apigateway/hrms/masterAsset/deleteAssetInfoById/${assetId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("Asset deleted successfully.");
//       setAssets(assets.filter(asset => asset.assetId !== assetId));
//     } catch (error) {
//       console.error('Error deleting asset:', error);
//       toast.error(error.response?.data?.message || "Failed to delete asset");
//     }
//   };

//   const handleEditAsset = (asset) => {
//     setEditingAsset(asset);
//     setAssetAttributes(asset.assetAttributeMappingList || []);
//   };

//   const handleAttributeChange = (index, attribute, value) => {
//     const updatedAttributes = [...assetAttributes];
//     updatedAttributes[index] = {
//       ...updatedAttributes[index],
//       [attribute]: value
//     };
//     setAssetAttributes(updatedAttributes);
//   };

//   const handleUpdateAsset = async () => {
//     try {
//       const updatedAsset = {
//         assetId: editingAsset.assetId,
//         assetAttributeMappingList: assetAttributes
//       };
//       await axios.put('/apigateway/hrms/masterAsset/updateAssetAttributeMappingByAssetId', updatedAsset, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       toast.success("Asset updated successfully.");
//       setEditingAsset(null);
//       fetchAssets();  // Refresh asset list after update
//     } catch (error) {
//       console.error('Error updating asset:', error);
//       toast.error(error.response?.data?.message || "Failed to update asset");
//     }
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       {loading ? <LoadingPage /> : ''}
//       <Typography variant="h6" gutterBottom>
//         Asset Management
//       </Typography>
//        <Box sx={{ mb: 2 }}>
//         <TextField
//           select
//           label="Search By"
//           value={searchCriterion}
//           onChange={handleCriterionChange}
//           variant="outlined"
//           sx={{ width: '39vh', mr: 1 }}
//         >
//           <MenuItem  value="firstName">First Name</MenuItem>
//           <MenuItem value="lastName">Last Name</MenuItem>
//           <MenuItem value="email">Email</MenuItem>
//           <MenuItem value="mobileNo">Mobile Number</MenuItem>
//         </TextField>
//         <TextField
//           type="text"
//           label="Enter Search Value"
//           value={searchValue}
//           onChange={handleValueChange}
//           variant="outlined"
//           sx={{ width: '30vh', mr: 1 }}
//         />
//         <Button variant="contained" color="primary" onClick={fetchAssets} disabled={loading} sx={{ width: '20vh', height: '8vh' }}>
//           {loading ? <CircularProgress size={24} /> : "Search"}
//         </Button>
//       </Box>
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Asset ID</TableCell>
//               <TableCell>Asset Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assets.map((asset) => (
//               <TableRow key={asset.assetId}>
//                 <TableCell>{asset.assetId}</TableCell>
//                 <TableCell>{asset.assetName}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditAsset(asset)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteAsset(asset.assetId)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {editingAsset && (
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>Edit Asset Attributes</Typography>
//           {assetAttributes.map((attr, index) => (
//             <Box key={index} sx={{ mb: 2 }}>
//               <TextField
//                 label="Attribute ID"
//                 value={attr.asset_attribute_id || ''}
//                 onChange={(e) => handleAttributeChange(index, 'asset_attribute_id', e.target.value)}
//                 variant="outlined"
//                 sx={{ mr: 1 }}
//               />
//               <TextField
//                 label="Attribute Value"
//                 value={attr.assetAttributeValue || ''}
//                 onChange={(e) => handleAttributeChange(index, 'assetAttributeValue', e.target.value)}
//                 variant="outlined"
//                 sx={{ mr: 1 }}
//               />
//             </Box>
//           ))}
//           <Button variant="contained" color="primary" onClick={handleUpdateAsset}>
//             Update Asset
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ViewAssets;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ViewAssets = ({
  assetTypeData,
  fetchAssetTypeData,
  setAssetTypeData,
}) => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);
  const [assetAttributes, setAssetAttributes] = useState([]);
  //  const [assetTypeData, setassetTypeData] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const fetchAssets = async (assetTypeId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetInfoByAssetTypeIdAndPagination/${assetTypeId}?page0=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssets(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error(error.response?.data?.message || "Failed to fetch assets");
      setLoading(false);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        setLoading(true);
        await axios.delete(
          `/apigateway/hrms/masterAsset/deleteAssetInfoByAssetAdtId?assetAdtId=${assetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Asset deleted successfully.");
        setAssets(assets.filter((asset) => asset.assetId !== assetId));
        fetchAssetTypeData();
        fetchAssets(selectedAssetType);
        setLoading(false);
      } catch (error) {
        console.error("Error deleting asset:", error);
        toast.error(error.response?.data?.message || "Failed to delete asset");
        setLoading(false);
      }
    }
  };

  const handleEditAsset = (asset) => {
    console.log("Editing asset:", asset.assetStatus);
    const status =
      asset.assetStatus || asset.status || asset.asset_status || "";
    setEditingAsset({ ...asset, assetStatus: status });
    setAssetAttributes(asset.assetAttributeMappingList || []);
    setOpenModal(true);
  };

  const handleAttributeChange = (index, attribute, value) => {
    const updatedAttributes = [...assetAttributes];
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      [attribute]: value,
    };
    setAssetAttributes(updatedAttributes);
  };

  const handleUpdateAsset = async () => {
    try {
      setLoading(true);
      const updatedAsset = {
        assetAdtId: editingAsset.assetAdtId,
        assetStatus: editingAsset.assetStatus,
        assetAttributeMappingList: assetAttributes.filter(
          (attr) =>
            attr.assetAttributeValue !== "NULL" &&
            attr.assetAttributeValue !== null &&
            attr.assetAttributeValue !== "null" &&
            attr.assetAttributeValue !== ""
        ),
      };
      await axios.put(
        "/apigateway/hrms/masterAsset/updateAssetAttributeMappingByAssetAdtId",
        updatedAsset,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Asset updated successfully.");
      setEditingAsset(null);
      setOpenModal(false);
      fetchAssets(selectedAssetType);
      setLoading(false);
    } catch (error) {
      console.error("Error updating asset:", error);
      toast.error(error.response?.data?.message || "Failed to update asset");
      setLoading(false);
    }
  };
  // const handleAddAttribute = () => {
  //   setAssetAttributes([
  //     ...assetAttributes,
  //     { assetAttributeName: "", assetAttributeValue: "" },
  //   ]);
  // };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = assetAttributes.filter((_, i) => i !== index);
    setAssetAttributes(updatedAttributes);
  };

  const handleAssetTypeChange = (event) => {
    setSelectedAssetType(event.target.value);
    fetchAssets(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAsset(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      {loading && <LoadingPage />}
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Asset Type"
          value={selectedAssetType}
          onChange={handleAssetTypeChange}
          variant="outlined"
          sx={{ width: "39vh", mr: 1 }}
        >
          {assetTypeData.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.assetName}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Asset Name</TableCell>
              <TableCell>Attributes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.assetAdtId}>
                <TableCell>{asset.assetAdtId}</TableCell>
                <TableCell>{asset.assetTypeName}</TableCell>
                <TableCell>
                  {asset.assetAttributeMappingList
                    .filter(
                      (attr) =>
                        attr.assetAttributeValue !== null &&
                        attr.assetAttributeValue !== "null" &&
                        attr.assetAttributeValue !== "NULL" &&
                        attr.assetAttributeValue !== ""
                    )
                    .map((attr, index) => (
                      <div key={index}>
                        <strong>{attr.assetAttributeName}:</strong>
                        {attr.assetAttributeValue}
                      </div>
                    ))}
                </TableCell>
                <TableCell>{asset.assetStatus || "N/A"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditAsset(asset)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteAsset(asset.assetAdtId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...modalStyle, width: 500 }}>
          {loading && <LoadingPage />}
          <Typography id="modal-title" variant="h6" gutterBottom>
            Edit Asset Attributes
          </Typography>
          {/* Status Field */}
          {editingAsset && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={editingAsset?.assetStatus || ""}
                label="Status"
                onChange={(e) =>
                  setEditingAsset((prev) => ({
                    ...prev,
                    assetStatus: e.target.value,
                  }))
                }
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Allotted">Allotted</MenuItem>
                <MenuItem value="Defective">Defective</MenuItem>
                <MenuItem value="Discarded">Discarded</MenuItem>
              </Select>
            </FormControl>
          )}
          {assetAttributes.map((attr, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                label="Attribute Name"
                value={attr.assetAttributeName || ""}
                variant="outlined"
                sx={{ mr: 1, flex: 1 }}
                disabled
              />
              <TextField
                label="Attribute Value"
                value={attr.assetAttributeValue || ""}
                onChange={(e) =>
                  handleAttributeChange(
                    index,
                    "assetAttributeValue",
                    e.target.value
                  )
                }
                variant="outlined"
                sx={{ flex: 1 }}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveAttribute(index)} // Remove attribute
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
            onClick={handleAddAttribute} // Add attribute
          >
            Add Attribute
          </Button> */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateAsset}
            >
              Update Asset
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default ViewAssets;
