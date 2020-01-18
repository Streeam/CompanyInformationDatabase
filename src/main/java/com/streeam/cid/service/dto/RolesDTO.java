package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Roles} entity.
 */
public class RolesDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean raiseNonconformace;

    @NotNull
    private Boolean viewNonconformance;

    @NotNull
    private Boolean editNonconformance;

    @NotNull
    private Boolean viewNonconformanceTasks;

    @NotNull
    private Boolean editNonconformanceTasks;

    @NotNull
    private Boolean deleteNonconformanceTasks;

    @NotNull
    private Boolean deleteNonconformance;

    @NotNull
    private Boolean raiseChangeRequest;

    @NotNull
    private Boolean viewCostAnalyses;

    @NotNull
    private Boolean editCostAnalyses;

    @NotNull
    private Boolean viewRequestSubmited;

    @NotNull
    private Boolean editRequestSubmited;

    @NotNull
    private Boolean approveRequestSubmited;

    @NotNull
    private Boolean viewPendingSubmited;

    @NotNull
    private Boolean editPendingSubmited;

    @NotNull
    private Boolean approvePendingSubmited;

    @NotNull
    private Boolean viewRejected;

    @NotNull
    private Boolean editRejected;

    @NotNull
    private Boolean editPurchaseRequest;

    @NotNull
    private Boolean deletePurchaseRequest;

    @NotNull
    private Boolean editProductStock;

    @NotNull
    private Boolean addProduct;

    @NotNull
    private Boolean deleteProduct;

    @NotNull
    private Boolean editProduct;

    @NotNull
    private Boolean addCustomer;

    @NotNull
    private Boolean deleteCustomer;

    @NotNull
    private Boolean editCustomer;

    @NotNull
    private Boolean addSupplier;

    @NotNull
    private Boolean deleteSupplier;

    @NotNull
    private Boolean editSupplier;

    @NotNull
    private Boolean raiseTask;

    @NotNull
    private Boolean addProgressTrack;

    @NotNull
    private Boolean deleteProgressTrack;

    @NotNull
    private Boolean editProgressTrack;

    @NotNull
    private Boolean viewProgressTrack;

    @NotNull
    private Boolean addNonConformanceReason;

    @NotNull
    private Boolean addRootCauses;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isRaiseNonconformace() {
        return raiseNonconformace;
    }

    public void setRaiseNonconformace(Boolean raiseNonconformace) {
        this.raiseNonconformace = raiseNonconformace;
    }

    public Boolean isViewNonconformance() {
        return viewNonconformance;
    }

    public void setViewNonconformance(Boolean viewNonconformance) {
        this.viewNonconformance = viewNonconformance;
    }

    public Boolean isEditNonconformance() {
        return editNonconformance;
    }

    public void setEditNonconformance(Boolean editNonconformance) {
        this.editNonconformance = editNonconformance;
    }

    public Boolean isViewNonconformanceTasks() {
        return viewNonconformanceTasks;
    }

    public void setViewNonconformanceTasks(Boolean viewNonconformanceTasks) {
        this.viewNonconformanceTasks = viewNonconformanceTasks;
    }

    public Boolean isEditNonconformanceTasks() {
        return editNonconformanceTasks;
    }

    public void setEditNonconformanceTasks(Boolean editNonconformanceTasks) {
        this.editNonconformanceTasks = editNonconformanceTasks;
    }

    public Boolean isDeleteNonconformanceTasks() {
        return deleteNonconformanceTasks;
    }

    public void setDeleteNonconformanceTasks(Boolean deleteNonconformanceTasks) {
        this.deleteNonconformanceTasks = deleteNonconformanceTasks;
    }

    public Boolean isDeleteNonconformance() {
        return deleteNonconformance;
    }

    public void setDeleteNonconformance(Boolean deleteNonconformance) {
        this.deleteNonconformance = deleteNonconformance;
    }

    public Boolean isRaiseChangeRequest() {
        return raiseChangeRequest;
    }

    public void setRaiseChangeRequest(Boolean raiseChangeRequest) {
        this.raiseChangeRequest = raiseChangeRequest;
    }

    public Boolean isViewCostAnalyses() {
        return viewCostAnalyses;
    }

    public void setViewCostAnalyses(Boolean viewCostAnalyses) {
        this.viewCostAnalyses = viewCostAnalyses;
    }

    public Boolean isEditCostAnalyses() {
        return editCostAnalyses;
    }

    public void setEditCostAnalyses(Boolean editCostAnalyses) {
        this.editCostAnalyses = editCostAnalyses;
    }

    public Boolean isViewRequestSubmited() {
        return viewRequestSubmited;
    }

    public void setViewRequestSubmited(Boolean viewRequestSubmited) {
        this.viewRequestSubmited = viewRequestSubmited;
    }

    public Boolean isEditRequestSubmited() {
        return editRequestSubmited;
    }

    public void setEditRequestSubmited(Boolean editRequestSubmited) {
        this.editRequestSubmited = editRequestSubmited;
    }

    public Boolean isApproveRequestSubmited() {
        return approveRequestSubmited;
    }

    public void setApproveRequestSubmited(Boolean approveRequestSubmited) {
        this.approveRequestSubmited = approveRequestSubmited;
    }

    public Boolean isViewPendingSubmited() {
        return viewPendingSubmited;
    }

    public void setViewPendingSubmited(Boolean viewPendingSubmited) {
        this.viewPendingSubmited = viewPendingSubmited;
    }

    public Boolean isEditPendingSubmited() {
        return editPendingSubmited;
    }

    public void setEditPendingSubmited(Boolean editPendingSubmited) {
        this.editPendingSubmited = editPendingSubmited;
    }

    public Boolean isApprovePendingSubmited() {
        return approvePendingSubmited;
    }

    public void setApprovePendingSubmited(Boolean approvePendingSubmited) {
        this.approvePendingSubmited = approvePendingSubmited;
    }

    public Boolean isViewRejected() {
        return viewRejected;
    }

    public void setViewRejected(Boolean viewRejected) {
        this.viewRejected = viewRejected;
    }

    public Boolean isEditRejected() {
        return editRejected;
    }

    public void setEditRejected(Boolean editRejected) {
        this.editRejected = editRejected;
    }

    public Boolean isEditPurchaseRequest() {
        return editPurchaseRequest;
    }

    public void setEditPurchaseRequest(Boolean editPurchaseRequest) {
        this.editPurchaseRequest = editPurchaseRequest;
    }

    public Boolean isDeletePurchaseRequest() {
        return deletePurchaseRequest;
    }

    public void setDeletePurchaseRequest(Boolean deletePurchaseRequest) {
        this.deletePurchaseRequest = deletePurchaseRequest;
    }

    public Boolean isEditProductStock() {
        return editProductStock;
    }

    public void setEditProductStock(Boolean editProductStock) {
        this.editProductStock = editProductStock;
    }

    public Boolean isAddProduct() {
        return addProduct;
    }

    public void setAddProduct(Boolean addProduct) {
        this.addProduct = addProduct;
    }

    public Boolean isDeleteProduct() {
        return deleteProduct;
    }

    public void setDeleteProduct(Boolean deleteProduct) {
        this.deleteProduct = deleteProduct;
    }

    public Boolean isEditProduct() {
        return editProduct;
    }

    public void setEditProduct(Boolean editProduct) {
        this.editProduct = editProduct;
    }

    public Boolean isAddCustomer() {
        return addCustomer;
    }

    public void setAddCustomer(Boolean addCustomer) {
        this.addCustomer = addCustomer;
    }

    public Boolean isDeleteCustomer() {
        return deleteCustomer;
    }

    public void setDeleteCustomer(Boolean deleteCustomer) {
        this.deleteCustomer = deleteCustomer;
    }

    public Boolean isEditCustomer() {
        return editCustomer;
    }

    public void setEditCustomer(Boolean editCustomer) {
        this.editCustomer = editCustomer;
    }

    public Boolean isAddSupplier() {
        return addSupplier;
    }

    public void setAddSupplier(Boolean addSupplier) {
        this.addSupplier = addSupplier;
    }

    public Boolean isDeleteSupplier() {
        return deleteSupplier;
    }

    public void setDeleteSupplier(Boolean deleteSupplier) {
        this.deleteSupplier = deleteSupplier;
    }

    public Boolean isEditSupplier() {
        return editSupplier;
    }

    public void setEditSupplier(Boolean editSupplier) {
        this.editSupplier = editSupplier;
    }

    public Boolean isRaiseTask() {
        return raiseTask;
    }

    public void setRaiseTask(Boolean raiseTask) {
        this.raiseTask = raiseTask;
    }

    public Boolean isAddProgressTrack() {
        return addProgressTrack;
    }

    public void setAddProgressTrack(Boolean addProgressTrack) {
        this.addProgressTrack = addProgressTrack;
    }

    public Boolean isDeleteProgressTrack() {
        return deleteProgressTrack;
    }

    public void setDeleteProgressTrack(Boolean deleteProgressTrack) {
        this.deleteProgressTrack = deleteProgressTrack;
    }

    public Boolean isEditProgressTrack() {
        return editProgressTrack;
    }

    public void setEditProgressTrack(Boolean editProgressTrack) {
        this.editProgressTrack = editProgressTrack;
    }

    public Boolean isViewProgressTrack() {
        return viewProgressTrack;
    }

    public void setViewProgressTrack(Boolean viewProgressTrack) {
        this.viewProgressTrack = viewProgressTrack;
    }

    public Boolean isAddNonConformanceReason() {
        return addNonConformanceReason;
    }

    public void setAddNonConformanceReason(Boolean addNonConformanceReason) {
        this.addNonConformanceReason = addNonConformanceReason;
    }

    public Boolean isAddRootCauses() {
        return addRootCauses;
    }

    public void setAddRootCauses(Boolean addRootCauses) {
        this.addRootCauses = addRootCauses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RolesDTO rolesDTO = (RolesDTO) o;
        if (rolesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rolesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RolesDTO{" +
            "id=" + getId() +
            ", raiseNonconformace='" + isRaiseNonconformace() + "'" +
            ", viewNonconformance='" + isViewNonconformance() + "'" +
            ", editNonconformance='" + isEditNonconformance() + "'" +
            ", viewNonconformanceTasks='" + isViewNonconformanceTasks() + "'" +
            ", editNonconformanceTasks='" + isEditNonconformanceTasks() + "'" +
            ", deleteNonconformanceTasks='" + isDeleteNonconformanceTasks() + "'" +
            ", deleteNonconformance='" + isDeleteNonconformance() + "'" +
            ", raiseChangeRequest='" + isRaiseChangeRequest() + "'" +
            ", viewCostAnalyses='" + isViewCostAnalyses() + "'" +
            ", editCostAnalyses='" + isEditCostAnalyses() + "'" +
            ", viewRequestSubmited='" + isViewRequestSubmited() + "'" +
            ", editRequestSubmited='" + isEditRequestSubmited() + "'" +
            ", approveRequestSubmited='" + isApproveRequestSubmited() + "'" +
            ", viewPendingSubmited='" + isViewPendingSubmited() + "'" +
            ", editPendingSubmited='" + isEditPendingSubmited() + "'" +
            ", approvePendingSubmited='" + isApprovePendingSubmited() + "'" +
            ", viewRejected='" + isViewRejected() + "'" +
            ", editRejected='" + isEditRejected() + "'" +
            ", editPurchaseRequest='" + isEditPurchaseRequest() + "'" +
            ", deletePurchaseRequest='" + isDeletePurchaseRequest() + "'" +
            ", editProductStock='" + isEditProductStock() + "'" +
            ", addProduct='" + isAddProduct() + "'" +
            ", deleteProduct='" + isDeleteProduct() + "'" +
            ", editProduct='" + isEditProduct() + "'" +
            ", addCustomer='" + isAddCustomer() + "'" +
            ", deleteCustomer='" + isDeleteCustomer() + "'" +
            ", editCustomer='" + isEditCustomer() + "'" +
            ", addSupplier='" + isAddSupplier() + "'" +
            ", deleteSupplier='" + isDeleteSupplier() + "'" +
            ", editSupplier='" + isEditSupplier() + "'" +
            ", raiseTask='" + isRaiseTask() + "'" +
            ", addProgressTrack='" + isAddProgressTrack() + "'" +
            ", deleteProgressTrack='" + isDeleteProgressTrack() + "'" +
            ", editProgressTrack='" + isEditProgressTrack() + "'" +
            ", viewProgressTrack='" + isViewProgressTrack() + "'" +
            ", addNonConformanceReason='" + isAddNonConformanceReason() + "'" +
            ", addRootCauses='" + isAddRootCauses() + "'" +
            "}";
    }
}
