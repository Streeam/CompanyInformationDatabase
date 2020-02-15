package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Roles.
 */
@Entity
@Table(name = "roles")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Roles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "raise_nonconformace", nullable = false)
    private Boolean raiseNonconformace;

    @NotNull
    @Column(name = "view_nonconformance", nullable = false)
    private Boolean viewNonconformance;

    @NotNull
    @Column(name = "edit_nonconformance", nullable = false)
    private Boolean editNonconformance;

    @NotNull
    @Column(name = "view_nonconformance_tasks", nullable = false)
    private Boolean viewNonconformanceTasks;

    @NotNull
    @Column(name = "edit_nonconformance_tasks", nullable = false)
    private Boolean editNonconformanceTasks;

    @NotNull
    @Column(name = "delete_nonconformance_tasks", nullable = false)
    private Boolean deleteNonconformanceTasks;

    @NotNull
    @Column(name = "delete_nonconformance", nullable = false)
    private Boolean deleteNonconformance;

    @NotNull
    @Column(name = "raise_change_request", nullable = false)
    private Boolean raiseChangeRequest;

    @NotNull
    @Column(name = "view_cost_analyses", nullable = false)
    private Boolean viewCostAnalyses;

    @NotNull
    @Column(name = "edit_cost_analyses", nullable = false)
    private Boolean editCostAnalyses;

    @NotNull
    @Column(name = "view_request_submited", nullable = false)
    private Boolean viewRequestSubmited;

    @NotNull
    @Column(name = "edit_request_submited", nullable = false)
    private Boolean editRequestSubmited;

    @NotNull
    @Column(name = "approve_request_submited", nullable = false)
    private Boolean approveRequestSubmited;

    @NotNull
    @Column(name = "view_pending_submited", nullable = false)
    private Boolean viewPendingSubmited;

    @NotNull
    @Column(name = "edit_pending_submited", nullable = false)
    private Boolean editPendingSubmited;

    @NotNull
    @Column(name = "approve_pending_submited", nullable = false)
    private Boolean approvePendingSubmited;

    @NotNull
    @Column(name = "view_rejected", nullable = false)
    private Boolean viewRejected;

    @NotNull
    @Column(name = "edit_rejected", nullable = false)
    private Boolean editRejected;

    @NotNull
    @Column(name = "edit_purchase_request", nullable = false)
    private Boolean editPurchaseRequest;

    @NotNull
    @Column(name = "delete_purchase_request", nullable = false)
    private Boolean deletePurchaseRequest;

    @NotNull
    @Column(name = "edit_product_stock", nullable = false)
    private Boolean editProductStock;

    @NotNull
    @Column(name = "add_product", nullable = false)
    private Boolean addProduct;

    @NotNull
    @Column(name = "delete_product", nullable = false)
    private Boolean deleteProduct;

    @NotNull
    @Column(name = "edit_product", nullable = false)
    private Boolean editProduct;

    @NotNull
    @Column(name = "add_customer", nullable = false)
    private Boolean addCustomer;

    @NotNull
    @Column(name = "delete_customer", nullable = false)
    private Boolean deleteCustomer;

    @NotNull
    @Column(name = "edit_customer", nullable = false)
    private Boolean editCustomer;

    @NotNull
    @Column(name = "add_supplier", nullable = false)
    private Boolean addSupplier;

    @NotNull
    @Column(name = "delete_supplier", nullable = false)
    private Boolean deleteSupplier;

    @NotNull
    @Column(name = "edit_supplier", nullable = false)
    private Boolean editSupplier;

    @NotNull
    @Column(name = "raise_task", nullable = false)
    private Boolean raiseTask;

    @NotNull
    @Column(name = "add_progress_track", nullable = false)
    private Boolean addProgressTrack;

    @NotNull
    @Column(name = "delete_progress_track", nullable = false)
    private Boolean deleteProgressTrack;

    @NotNull
    @Column(name = "edit_progress_track", nullable = false)
    private Boolean editProgressTrack;

    @NotNull
    @Column(name = "view_progress_track", nullable = false)
    private Boolean viewProgressTrack;

    @NotNull
    @Column(name = "add_non_conformance_reason", nullable = false)
    private Boolean addNonConformanceReason;

    @NotNull
    @Column(name = "add_root_causes", nullable = false)
    private Boolean addRootCauses;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isRaiseNonconformace() {
        return raiseNonconformace;
    }

    public Roles raiseNonconformace(Boolean raiseNonconformace) {
        this.raiseNonconformace = raiseNonconformace;
        return this;
    }

    public void setRaiseNonconformace(Boolean raiseNonconformace) {
        this.raiseNonconformace = raiseNonconformace;
    }

    public Boolean isViewNonconformance() {
        return viewNonconformance;
    }

    public Roles viewNonconformance(Boolean viewNonconformance) {
        this.viewNonconformance = viewNonconformance;
        return this;
    }

    public void setViewNonconformance(Boolean viewNonconformance) {
        this.viewNonconformance = viewNonconformance;
    }

    public Boolean isEditNonconformance() {
        return editNonconformance;
    }

    public Roles editNonconformance(Boolean editNonconformance) {
        this.editNonconformance = editNonconformance;
        return this;
    }

    public void setEditNonconformance(Boolean editNonconformance) {
        this.editNonconformance = editNonconformance;
    }

    public Boolean isViewNonconformanceTasks() {
        return viewNonconformanceTasks;
    }

    public Roles viewNonconformanceTasks(Boolean viewNonconformanceTasks) {
        this.viewNonconformanceTasks = viewNonconformanceTasks;
        return this;
    }

    public void setViewNonconformanceTasks(Boolean viewNonconformanceTasks) {
        this.viewNonconformanceTasks = viewNonconformanceTasks;
    }

    public Boolean isEditNonconformanceTasks() {
        return editNonconformanceTasks;
    }

    public Roles editNonconformanceTasks(Boolean editNonconformanceTasks) {
        this.editNonconformanceTasks = editNonconformanceTasks;
        return this;
    }

    public void setEditNonconformanceTasks(Boolean editNonconformanceTasks) {
        this.editNonconformanceTasks = editNonconformanceTasks;
    }

    public Boolean isDeleteNonconformanceTasks() {
        return deleteNonconformanceTasks;
    }

    public Roles deleteNonconformanceTasks(Boolean deleteNonconformanceTasks) {
        this.deleteNonconformanceTasks = deleteNonconformanceTasks;
        return this;
    }

    public void setDeleteNonconformanceTasks(Boolean deleteNonconformanceTasks) {
        this.deleteNonconformanceTasks = deleteNonconformanceTasks;
    }

    public Boolean isDeleteNonconformance() {
        return deleteNonconformance;
    }

    public Roles deleteNonconformance(Boolean deleteNonconformance) {
        this.deleteNonconformance = deleteNonconformance;
        return this;
    }

    public void setDeleteNonconformance(Boolean deleteNonconformance) {
        this.deleteNonconformance = deleteNonconformance;
    }

    public Boolean isRaiseChangeRequest() {
        return raiseChangeRequest;
    }

    public Roles raiseChangeRequest(Boolean raiseChangeRequest) {
        this.raiseChangeRequest = raiseChangeRequest;
        return this;
    }

    public void setRaiseChangeRequest(Boolean raiseChangeRequest) {
        this.raiseChangeRequest = raiseChangeRequest;
    }

    public Boolean isViewCostAnalyses() {
        return viewCostAnalyses;
    }

    public Roles viewCostAnalyses(Boolean viewCostAnalyses) {
        this.viewCostAnalyses = viewCostAnalyses;
        return this;
    }

    public void setViewCostAnalyses(Boolean viewCostAnalyses) {
        this.viewCostAnalyses = viewCostAnalyses;
    }

    public Boolean isEditCostAnalyses() {
        return editCostAnalyses;
    }

    public Roles editCostAnalyses(Boolean editCostAnalyses) {
        this.editCostAnalyses = editCostAnalyses;
        return this;
    }

    public void setEditCostAnalyses(Boolean editCostAnalyses) {
        this.editCostAnalyses = editCostAnalyses;
    }

    public Boolean isViewRequestSubmited() {
        return viewRequestSubmited;
    }

    public Roles viewRequestSubmited(Boolean viewRequestSubmited) {
        this.viewRequestSubmited = viewRequestSubmited;
        return this;
    }

    public void setViewRequestSubmited(Boolean viewRequestSubmited) {
        this.viewRequestSubmited = viewRequestSubmited;
    }

    public Boolean isEditRequestSubmited() {
        return editRequestSubmited;
    }

    public Roles editRequestSubmited(Boolean editRequestSubmited) {
        this.editRequestSubmited = editRequestSubmited;
        return this;
    }

    public void setEditRequestSubmited(Boolean editRequestSubmited) {
        this.editRequestSubmited = editRequestSubmited;
    }

    public Boolean isApproveRequestSubmited() {
        return approveRequestSubmited;
    }

    public Roles approveRequestSubmited(Boolean approveRequestSubmited) {
        this.approveRequestSubmited = approveRequestSubmited;
        return this;
    }

    public void setApproveRequestSubmited(Boolean approveRequestSubmited) {
        this.approveRequestSubmited = approveRequestSubmited;
    }

    public Boolean isViewPendingSubmited() {
        return viewPendingSubmited;
    }

    public Roles viewPendingSubmited(Boolean viewPendingSubmited) {
        this.viewPendingSubmited = viewPendingSubmited;
        return this;
    }

    public void setViewPendingSubmited(Boolean viewPendingSubmited) {
        this.viewPendingSubmited = viewPendingSubmited;
    }

    public Boolean isEditPendingSubmited() {
        return editPendingSubmited;
    }

    public Roles editPendingSubmited(Boolean editPendingSubmited) {
        this.editPendingSubmited = editPendingSubmited;
        return this;
    }

    public void setEditPendingSubmited(Boolean editPendingSubmited) {
        this.editPendingSubmited = editPendingSubmited;
    }

    public Boolean isApprovePendingSubmited() {
        return approvePendingSubmited;
    }

    public Roles approvePendingSubmited(Boolean approvePendingSubmited) {
        this.approvePendingSubmited = approvePendingSubmited;
        return this;
    }

    public void setApprovePendingSubmited(Boolean approvePendingSubmited) {
        this.approvePendingSubmited = approvePendingSubmited;
    }

    public Boolean isViewRejected() {
        return viewRejected;
    }

    public Roles viewRejected(Boolean viewRejected) {
        this.viewRejected = viewRejected;
        return this;
    }

    public void setViewRejected(Boolean viewRejected) {
        this.viewRejected = viewRejected;
    }

    public Boolean isEditRejected() {
        return editRejected;
    }

    public Roles editRejected(Boolean editRejected) {
        this.editRejected = editRejected;
        return this;
    }

    public void setEditRejected(Boolean editRejected) {
        this.editRejected = editRejected;
    }

    public Boolean isEditPurchaseRequest() {
        return editPurchaseRequest;
    }

    public Roles editPurchaseRequest(Boolean editPurchaseRequest) {
        this.editPurchaseRequest = editPurchaseRequest;
        return this;
    }

    public void setEditPurchaseRequest(Boolean editPurchaseRequest) {
        this.editPurchaseRequest = editPurchaseRequest;
    }

    public Boolean isDeletePurchaseRequest() {
        return deletePurchaseRequest;
    }

    public Roles deletePurchaseRequest(Boolean deletePurchaseRequest) {
        this.deletePurchaseRequest = deletePurchaseRequest;
        return this;
    }

    public void setDeletePurchaseRequest(Boolean deletePurchaseRequest) {
        this.deletePurchaseRequest = deletePurchaseRequest;
    }

    public Boolean isEditProductStock() {
        return editProductStock;
    }

    public Roles editProductStock(Boolean editProductStock) {
        this.editProductStock = editProductStock;
        return this;
    }

    public void setEditProductStock(Boolean editProductStock) {
        this.editProductStock = editProductStock;
    }

    public Boolean isAddProduct() {
        return addProduct;
    }

    public Roles addProduct(Boolean addProduct) {
        this.addProduct = addProduct;
        return this;
    }

    public void setAddProduct(Boolean addProduct) {
        this.addProduct = addProduct;
    }

    public Boolean isDeleteProduct() {
        return deleteProduct;
    }

    public Roles deleteProduct(Boolean deleteProduct) {
        this.deleteProduct = deleteProduct;
        return this;
    }

    public void setDeleteProduct(Boolean deleteProduct) {
        this.deleteProduct = deleteProduct;
    }

    public Boolean isEditProduct() {
        return editProduct;
    }

    public Roles editProduct(Boolean editProduct) {
        this.editProduct = editProduct;
        return this;
    }

    public void setEditProduct(Boolean editProduct) {
        this.editProduct = editProduct;
    }

    public Boolean isAddCustomer() {
        return addCustomer;
    }

    public Roles addCustomer(Boolean addCustomer) {
        this.addCustomer = addCustomer;
        return this;
    }

    public void setAddCustomer(Boolean addCustomer) {
        this.addCustomer = addCustomer;
    }

    public Boolean isDeleteCustomer() {
        return deleteCustomer;
    }

    public Roles deleteCustomer(Boolean deleteCustomer) {
        this.deleteCustomer = deleteCustomer;
        return this;
    }

    public void setDeleteCustomer(Boolean deleteCustomer) {
        this.deleteCustomer = deleteCustomer;
    }

    public Boolean isEditCustomer() {
        return editCustomer;
    }

    public Roles editCustomer(Boolean editCustomer) {
        this.editCustomer = editCustomer;
        return this;
    }

    public void setEditCustomer(Boolean editCustomer) {
        this.editCustomer = editCustomer;
    }

    public Boolean isAddSupplier() {
        return addSupplier;
    }

    public Roles addSupplier(Boolean addSupplier) {
        this.addSupplier = addSupplier;
        return this;
    }

    public void setAddSupplier(Boolean addSupplier) {
        this.addSupplier = addSupplier;
    }

    public Boolean isDeleteSupplier() {
        return deleteSupplier;
    }

    public Roles deleteSupplier(Boolean deleteSupplier) {
        this.deleteSupplier = deleteSupplier;
        return this;
    }

    public void setDeleteSupplier(Boolean deleteSupplier) {
        this.deleteSupplier = deleteSupplier;
    }

    public Boolean isEditSupplier() {
        return editSupplier;
    }

    public Roles editSupplier(Boolean editSupplier) {
        this.editSupplier = editSupplier;
        return this;
    }

    public void setEditSupplier(Boolean editSupplier) {
        this.editSupplier = editSupplier;
    }

    public Boolean isRaiseTask() {
        return raiseTask;
    }

    public Roles raiseTask(Boolean raiseTask) {
        this.raiseTask = raiseTask;
        return this;
    }

    public void setRaiseTask(Boolean raiseTask) {
        this.raiseTask = raiseTask;
    }

    public Boolean isAddProgressTrack() {
        return addProgressTrack;
    }

    public Roles addProgressTrack(Boolean addProgressTrack) {
        this.addProgressTrack = addProgressTrack;
        return this;
    }

    public void setAddProgressTrack(Boolean addProgressTrack) {
        this.addProgressTrack = addProgressTrack;
    }

    public Boolean isDeleteProgressTrack() {
        return deleteProgressTrack;
    }

    public Roles deleteProgressTrack(Boolean deleteProgressTrack) {
        this.deleteProgressTrack = deleteProgressTrack;
        return this;
    }

    public void setDeleteProgressTrack(Boolean deleteProgressTrack) {
        this.deleteProgressTrack = deleteProgressTrack;
    }

    public Boolean isEditProgressTrack() {
        return editProgressTrack;
    }

    public Roles editProgressTrack(Boolean editProgressTrack) {
        this.editProgressTrack = editProgressTrack;
        return this;
    }

    public void setEditProgressTrack(Boolean editProgressTrack) {
        this.editProgressTrack = editProgressTrack;
    }

    public Boolean isViewProgressTrack() {
        return viewProgressTrack;
    }

    public Roles viewProgressTrack(Boolean viewProgressTrack) {
        this.viewProgressTrack = viewProgressTrack;
        return this;
    }

    public void setViewProgressTrack(Boolean viewProgressTrack) {
        this.viewProgressTrack = viewProgressTrack;
    }

    public Boolean isAddNonConformanceReason() {
        return addNonConformanceReason;
    }

    public Roles addNonConformanceReason(Boolean addNonConformanceReason) {
        this.addNonConformanceReason = addNonConformanceReason;
        return this;
    }

    public void setAddNonConformanceReason(Boolean addNonConformanceReason) {
        this.addNonConformanceReason = addNonConformanceReason;
    }

    public Boolean isAddRootCauses() {
        return addRootCauses;
    }

    public Roles addRootCauses(Boolean addRootCauses) {
        this.addRootCauses = addRootCauses;
        return this;
    }

    public void setAddRootCauses(Boolean addRootCauses) {
        this.addRootCauses = addRootCauses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Roles)) {
            return false;
        }
        return id != null && id.equals(((Roles) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Roles{" +
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
