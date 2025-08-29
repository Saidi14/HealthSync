package healthsync.service;

/**
 * Generic service interface for CRUD operations
 * @param <T> the entity type
 * @param <ID> the ID type of the entity
 */
public interface IService<T, ID> {
    
    /**
     * Create a new entity
     * @param entity the entity to create
     * @return the created entity
     */
    T create(T entity);
    
    /**
     * Read an entity by ID
     * @param id the ID of the entity to read
     * @return the found entity
     */
    T read(ID id);
    
    /**
     * Update an existing entity
     * @param entity the entity to update
     * @return the updated entity
     */
    T update(T entity);
    
    /**
     * Delete an entity by ID
     * @param id the ID of the entity to delete
     * @return true if deleted successfully, false otherwise
     */
    boolean delete(ID id);
}
